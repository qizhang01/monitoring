import React from 'react' // 引入react
import {connect} from 'react-redux'
import {Route, Switch, Redirect} from 'react-router-dom';
import Bundle from 'src/bundle.jsx';

/**
 * 加载模块的根业务组件
 */

import ReportContainer from 'bundle-loader?lazy!src/router/report/index';
import UCContainer from 'bundle-loader?lazy!src/router/uc/index';
/**
 * Bundle加载业务组件
 * @Author   
 * @DateTime 
 * @param    {[type]}   props [description]
 * @returns  {[type]}         [description]
 */



const RouterUC = (props) => {
    return <Bundle load={UCContainer}>
        {(Container) => <Container {...props}/>}
    </Bundle>
}



const RouterReport = (props) => {
    return <Bundle load={ReportContainer}>
        {(Container) => <Container {...props}/>}
    </Bundle>
}

/**
 * 跳转到登录页面
 * @param {[type]} props [description]
 */
const RedirectLogin=(props)=>{
    document.location.href='./login.html'
}
/**
 * 在这里做权限控制
 * @param {[type]} component [description]
 * @param {[type]} rest      [description]
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    return <Route render={ props =><Component { ...props } $routerProps={rest} />}/>
    // return <Route render={props =>wish.getCookie('isLogin')?<Component { ...props } $routerProps={rest} />:<RedirectLogin  {...props}></RedirectLogin>}/>

};

const RouteNoFound = () => {
    return <div style={{ width: '100%', height: '100%', paddingTop: 200, textAlign: 'center' }}> <h1>Page not found</h1> </div>
}

/**
 * 按照正常路由配置、配置组件
 * @Author  
 * @DateTime 
 * @returns  {[type]}   [description]
 */
export default class RouterLayout extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<Switch>
            <PrivateRoute path="/monitoring/uc" component={RouterUC}/>
            <PrivateRoute path="/monitoring/report" component={RouterReport}/>
            <Route component={RouteNoFound} />
        </Switch>)
    }
}