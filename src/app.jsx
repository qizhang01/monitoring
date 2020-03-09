import 'antd/dist/antd.less';
import 'src/common/styles/app.less';
import 'src/common/styles/components.less';
import {hot} from 'react-hot-loader'

import React, {Component, PropTypes} from 'react';
import {Provider} from 'react-redux';
import {Link, HashRouter as Router, Route, withRouter} from 'react-router-dom';
import Login from 'src/router/login/index'
import LayoutContainer from 'src/layout/LayoutContainer'

class AppContainer extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        // const {store} = this.props;
        return (
            <Router>
                <div style={{height:'100%'}}>
                    <Route path="/monitoring" component={LayoutContainer} />
                    <Route path="/" component={Login} />
                </div>
            </Router>
        )
    }
}

export default hot(module)(AppContainer)