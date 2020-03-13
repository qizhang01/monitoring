import React from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';

import UC from 'src/router/uc/components/index'
import {PasswordChange} from './components/passwordChange'
class UCContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="module-container">
                <Route exact path="/monitoring/uc/admin"render={(props) => {
                        return <UC></UC>
                }}/>
                <Route exact path="/monitoring/uc/passwordChange" render={(props) => {
                        return <PasswordChange></PasswordChange>
                }}/>
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     list: state.lists
// })
// const mapActionToProps = dispatch => ({
//     fetchUsersList: value => dispatch({
//         type: 'fetch_user_list',
//         payload: ''
//     })
// })

export default UCContainer

