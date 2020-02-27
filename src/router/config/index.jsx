import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch,withRouter } from 'react-router-dom';

import {SystemTable} from './components/index'
import Account from './components/account'

class AuthContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="module-container">
                <Route exact path="/infusion/auth/role"render={(props) => {
                        return <SystemTable></SystemTable>
                    }}/>
                <Route exact path="/infusion/auth/account" render={(props) => {
                        return <Account></Account>
                    }}/>
            </div>
        )
    }
}
export default withRouter(AuthContainer)
