/**
 * saga-cli 核心模块
 *
 * 1 封装了一个通用的action监听函数、监听所有的action
 * 2 初始化了一个默认Reducer {name:"",version:""}
 * 3 约定action规范
 * 		{
 * 			type:String 动作类型、如果是异步Action 则和API name一致
 * 			sync:Boolean [false] 是否是同步Action
 * 			method:String [get] http请求类型
 * 			data:Object 动作描述、这里是用于fetch请求的参数
 * 				-{query,path,body,...params}
 * 		}
 */

import {fork, put, take, call,takeEvery} from 'redux-saga/effects';
import {createStore, applyMiddleware,compose} from "redux";
import createSagaMiddleware from 'redux-saga';
import {combineReducers} from 'redux';
const sagaMiddleware = createSagaMiddleware();
const debug=false;
const initState = {
    name: "saga-cli",
    version: "0.0.1"
};

const util = {
    asyn(type) {
        return `FETCH_${type}`
    },
    sync(type) {
        return `LOCAL_${type}`
    },
    isAsyn(type) {
        return type.indexOf("FETCH_") == 0
    },
    isSync(type) {
        return type.indexOf("LOCAL_") == 0
    },
    success(type) {
        return `FETCH_${type}_SUCCESS`
    },
    failure(type) {
        return `FETCH_${type}_FAILURE`
    },
    isResult(type){
        return type.indexOf('FETCH_')!=-1
    }
}

function SagaReducer(state = initState, action) {
    return state;
}

var load = function(action) {}

/*function load(action){
	action.data=action.data||{};
	return wish.fetch({name:action.type,...action.data},action.method).then((res)=>res);
}*/

/**
 * 异步加载数据
 * @Author   zhangq
 * @DateTime 2019-7-07
 * @param    {[type]}   action        [description]
 * @yields   {[type]}   [description]
 */
function* asynLoader(action) {
    try {
        var result = yield call(load, action);
        console.log(result);
        yield put({
            type: util.success(action.type),
            data: result
        })
        return result;
    } catch (e) {
        console.error('run action:' + action.type);
        console.error("action load error with a exception")
        console.error(e)
    }
}

/**
 * 定义一个Watcher监控所有类型的action
 * @Author   zhq
 * @DateTime 2019-7-07
 * @yields   {[type]}   [description]
 */
function* watcher() {
    while (true) {
        const action = yield take("*");
        if(action.sync){
            console.log(action)
        }else{
            if (action.saga) {
                try {
                    yield call(action.saga, action)
                }
                catch (e) {
                    console.log(e)
                }
            } else {
                if (!action.sync && !util.isResult(action.type)) {
                    yield fork(asynLoader, action);
                }
            }
        }

    }
}

function* rootSaga() {
    yield fork(watcher);
}

export default {

    /**
	 * saga-core 初始化函数
	 * @Author   zhq
	 * @DateTime 2019-6-24
	 * @param    {Object}   reducer 业务Reducer
	 * @param    {Function}   fetcher 用于异步请求接口的方法、必须返回一个Promise
	 * @returns  {Object}     Store
	 */
    init: function(reducer, fetcher) {

        var store = createStore(combineReducers({
            saga: SagaReducer,
            ...reducer
        }), debug?compose(applyMiddleware(sagaMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()):applyMiddleware(sagaMiddleware));

        sagaMiddleware.run(rootSaga);

        load = fetcher;

        return {
            ...store
        }
    }
}
