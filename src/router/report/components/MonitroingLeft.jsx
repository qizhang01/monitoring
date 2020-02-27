import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch,withRouter,Link} from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import "../styles/index.less"
import { fetchAPI } from "src/ajax/fetchApi"

class MonitroingLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showData: {}           
        }
    }
    componentWillMount(){
        let option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true,
                        }
                    },
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                    ]
                }
            ]
        };
        this.setState({
            showData: option
        })
    }
    
    render() {
        let {showData}=this.state;
        return (
        <div className="report-content">
            <div style={{display:'flex',flexFlow:'column',margin:10}}>
                <div style={{display:'flex',flexShrink:0}}>
                    <ReactEcharts
                        option={showData}
                        className='left_echarts'/>
                </div>
            </div>
        </div>)
    }
}

export default withRouter(MonitroingLeft)
