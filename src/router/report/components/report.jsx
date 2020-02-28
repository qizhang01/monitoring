import React from 'react';
import { connect } from 'react-redux';
import {Select,DatePicker} from 'antd';
import {Route, Switch,withRouter,Link} from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import "../styles/index.less"
import { fetchAPI } from "src/ajax/fetchApi"
import locale from 'antd/es/date-picker/locale/zh_CN';

const {MonthPicker} = DatePicker

let monthD = {
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
            data : ['微店','员福','爱行销','E保通','赠险','交银人寿','卡中心']
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
            data:[1140, 550, 660, 90, 150, 390, 120],
        },
    ]
}

class ReportContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            colors:[],
            selectYear: '',
            showData: monthD,
            isOpen: false
        }
    }

    clearValue = (value)=>{
       this.setState({selectYear:''})
    }

    handlePanelChange = (value) =>{
        const v = new Date(value)
        const year = v.getFullYear()
        this.setState({
            selectYear: value
        })
       this.getShowData(year)
    }
    
    async getShowData(year){
        const param = `year=${year}`
        const res = await fetchAPI('report',param)
        const d = {
            ...monthD,
            series: this.parseData(res)
        }
        this.setState({
            showData: d
        })
    }
    
    parseData(d){
        let obj = {
            name:'趋势图',
            type:'line',
            stack: '总量',
            data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }
        let series = []
        d.forEach( (item,index) => obj.data.splice( item.time, 1, item.count) )
        series.push(obj)
        return series
    }

    handleOpenChange=(status)=>{
        if(status){
            this.setState({isOpen: true})
        }else{
            this.setState({isOpen: false})
        }

    }

    handleMonthChange = (date,datestring)=>{
        // let splitArr = datestring.split('-')
        // const year = splitArr[0]
        // const month = splitArr[1]
        // if(month){
        //     this.getShowData(year,month)
        // }
    }
    render() {
        let {selectYear,showData,isOpen}=this.state;
        return [<div className="report-header">
            <div className="form">
                <span style={{color:'#000'}}>请选择月份</span>
                <MonthPicker
                    onChange={this.handleMonthChange}
                    placeholder="请选择月份"  
                    locale={locale}                  
                   >
                </MonthPicker>
            </div>
            <div></div>
        </div>,
        <div className="report-content">
            <div style={{display:'flex',flexFlow:'column',margin:30}}>

                <div style={{display:'flex',height:400,flexShrink:0}}>
                    <ReactEcharts
                        option={showData}
                        style={{height: 400, width: '100%'}}
                        className='react_for_echarts'/>
                </div>
            </div>
        </div>]
    }
}
export default withRouter(ReportContainer)
