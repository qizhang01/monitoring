import React from 'react';
import { connect } from 'react-redux';
import {Select,DatePicker} from 'antd';
import {Route, Switch,withRouter,Link} from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import "../styles/index.less"
import { fetchAPI } from "src/ajax/fetchApi"
import locale from 'antd/es/date-picker/locale/zh_CN';
const {MonthPicker} = DatePicker


class ReportContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectMonth: '',
            showData: {}           
        }
    }
    componentWillMount(){
        let Daysbar = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['趋势图']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['18:40','18:45','18:50','18:55','19:00','19:05','19:10','19:15']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'趋势图',
                    type:'line',
                    stack: '总量',
                    data: ['0.73','1.50','2.00','1.75','1.50','1.00','0.95','0.50']
                },
            ]
        }
        this.setState({
            showData: Daysbar
        })
    }
    
    getInitData(days,type){
        let arr = []
        for(let i=0; i<days+1; i++){
            if(type==1){
                arr.push(i)
            }else{
                arr.push(0)
            }
        }
        return arr
    }

    getMonthDay(year, month) {
        let days = new Date(year, month + 1, 0).getDate()
        return days
    }

    async getShowData(year,month){
        const param = `year=${year}&month=${month}`
        const res = await fetchAPI('report',param)
        console.log(res)
        const days = this.getMonthDay(year,month)
        let xAxis  = [
            {
                type : 'category',
                boundaryGap : false,
                data : this.getInitData(days,1)
            }
        ],

        series = this.parseData(res, days)
        const obj ={
            ...this.state.showData,
            xAxis,
            series,
        }
        this.setState({
            showData: obj
        })
        
    }

    parseData(d,days){
        let obj = {
            name:'趋势图',
            type:'line',
            stack: '总量',
            data:this.getInitData(days,0)
        }
        let series = []
        d.forEach( (item,index) => obj.data.splice( item.time, 1, item.count) )
        series.push(obj)
        return series
    }


    render() {
        let {showData}=this.state;
        return (
            <div className="report-content">
                <div style={{display:'flex',flexFlow:'column',margin:30}}>
                    <div style={{display:'flex',height:400,flexShrink:0}}>
                        <ReactEcharts
                            option={showData}
                            style={{height: 400, width: '100%'}}
                            className='react_for_echarts'/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(ReportContainer)
