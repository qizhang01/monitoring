import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch,withRouter } from 'react-router-dom';
import "./styles/index.less"
import IndexStatistics from './components/indexStatistics'
import Report from './components/report'
import DayReport from './components/dayReport'
class ReportContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="module-container report-container">
                <Route exact path="/monitoring/report" render={(props) => {
                        return <IndexStatistics></IndexStatistics>
                    }}/>
                <Route exact path="/monitoring/report/view" render={(props) => {
                        return <Report></Report>
                    }}/>
                <Route exact path="/monitoring/report/dayTrend" render={(props) => {
                        return <DayReport></DayReport>
                }}/>
            </div>
        )
    }
}
export default withRouter(ReportContainer)
