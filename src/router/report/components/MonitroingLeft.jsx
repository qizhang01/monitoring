import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch,withRouter,Link} from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import "../styles/index.less"
import { fetchAPI } from "src/ajax/fetchApi"

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
            labelLine: {
                normal: {
                    show: true,
                }
            },
            data: [
                {value: 32, 
                name: '102.15.15.234',
                label: {
                        formatter: [
                            '{title|{b}}',
                            '{d}%',
                        ].join('\n'),
                        rich: {
                            title: {
                                align: 'center'
                            },
                        }    
                    }
                },
                {value: 40, 
                 name: '130.15.15.234',
                 label: {
                    formatter: [
                        '{title|{b}}',
                        '{d}%',
                    ].join('\n'),
                    rich: {
                        title: {
                            align: 'center'
                        },
                    }    
                }},
                {value: 28, 
                name: '102.15.0.234',
                label: {
                    formatter: [
                        '{title|{b}}{abg|}',
                        '{d}%',
                    ].join('\n'),
                    rich: {
                        title: {
                            align: 'center'
                        },
                    }    
                }},
            ]
        }
    ]
};
class MonitroingLeft extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            showData: {}           
        }
    }
    componentWillMount(){

        this.setState({
            showData: this.getDataFromProps()
        })
    }
    
    getDataFromProps(){
        const d = this.props.data
        const arr = d.map(item=>{
            const {value,name} = item
            return {
                value,
                name,
                label: {
                    formatter: [
                        '{title|{b}}{abg|}',
                        '{d}%',
                    ].join('\n'),
                    rich: {
                        title: {
                            align: 'center'
                        },
                    }    
                }
            }
        })
        return {
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
                    labelLine: {
                        normal: {
                            show: true,
                        }
                    },
                    data: arr
            }]
        }    
    }

    render() {
        let {showData}=this.state;
        return (
            <div className="report-content" style={{marginTop: '25px',marginBottom:'40px'}}>
                <div style={{display:'flex',flexFlow:'column',margin:10}}>
                    <div style={{display:'flex',flexShrink:0, justifyContent:'center',alignItems: 'center'}}>
                        <div style={{color: '#fff',position: 'absolute', width: this.props.width } }>{this.props.title}</div>
                        <ReactEcharts
                            option={showData} 
                            className='left_echarts'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MonitroingLeft)
