import React from 'react';
import ReactDOM from 'react-dom';

/**
 * 我封装的SagaCore模块
 * 1 创建Store
 * 2 创建Saga
 * 3 内置默认reducer信息
 */
// import SagaCore from 'src/saga/core';

import AppContainer from './app';


/* import rootSaga from 'src/saga/index';
import Store from 'src/saga/store';
Store.run(rootSaga); */

/**
 * 所有模块的reducer
 */
// import AppReducer from 'src/router/reducer';

// const reducer = {
//     app: AppReducer,
// }


ReactDOM.render(<AppContainer></AppContainer>, document.getElementById('react'));
