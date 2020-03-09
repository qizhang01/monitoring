import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import AppContainer from './app';
/**
 * 所有模块的reducer
 */
import AppReducer from 'src/router/reducer';
import ReportReducer from 'src/router/report/reducer';
import { watcher } from "src/saga/watcher";

// const sagaMiddleware = createSagaMiddleware();
// const reducer = {
//     app: AppReducer,
//     report: ReportReducer,
// }

// const store = createStore(
//     reducer,
//     applyMiddleware(sagaMiddleware),
//  );

// sagaMiddleware.run(watcher)

// ReactDOM.render(
//     <Provider store={store}>
//         <AppContainer />
//     </Provider>,
//     document.getElementById('react')
// );

ReactDOM.render(

    <AppContainer />
,
    document.getElementById('react')
);