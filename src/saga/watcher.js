import { call, put, takeEvery } from 'redux-saga/effects'

/**
 * 副作用处理 effects：
 *  用于异步处理请求
 * */
export const effects = {
	// 获取用户列表
	*fetchUserList(payload) {
		const res = yield call(fetch, payload);
		// const res = yield call(axios.post, 'http://jsonplaceholder.typicode.com/posts', {section_id: action.sectionId});
		if (res.success) {
			yield put({
				type: 'fetch_user_list_success',
				payload: {
				    usersLists: res.data,
				}
			});
		}
	}
}

/**
 * 异步 action 监听：
 *  dispatch 对应的action时，调用对应的异步处理方法
 * */
export function* watcher() {
   	yield takeEvery('fetch_user_list', effects.fetchUserList);
}