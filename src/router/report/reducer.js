import util from 'src/common/util';
// import {SAVE_CLICK,LOAD_LIST} from 'src/router/home/actions';


const initState={
    leftHealthData:{},
    articles:[]
}

export default function ReportReducer(state=initState,action){
    switch(action.type){
        case util.success(SAVE_CLICK):
             return{
                ...state,
                leftHealthData: action.data
             }
        case util.success(LOAD_LIST):
             return Object.assign({},state,{articles:action.data});
        default :
            return state
    }
}