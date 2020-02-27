import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch,withRouter } from 'react-router-dom';

import UC from 'src/router/uc/components/index'
import {PasswordChange} from './components/passwordChange'
class UCContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="module-container">
                <Route exact path="/infusion/uc/admin"render={(props) => {
                        return <UC></UC>
                }}/>
                <Route exact path="/infusion/uc/passwordChange" render={(props) => {
                        return <PasswordChange></PasswordChange>
                }}/>
            </div>
        )
    }
}
export default withRouter(UCContainer)
