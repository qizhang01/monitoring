import React from 'react';
import { connect } from 'react-redux';
import {Select,DatePicker,Button, Checkbox} from 'antd';
import {Route, Switch,withRouter,Link} from 'react-router-dom';
import ReactEcharts from 'echarts-for-react';
import "../styles/index.less"
import { fetchAPI } from "src/ajax/fetchApi"
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

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
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    xAxis : [
        {
            type : 'category',
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
            type:'bar',
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
            isOpen: false,
            queryHistoryMode: false
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
            type:'bar',
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

    print(){
        const html = window.document.getElementById('reportChart').innerHTML
        const win = window.open('','print_window');
        win.document.write(html);
        win.print();
        win.close();
    }
    
    onChangeModal = (e)=>{
        this.setState({
            queryHistoryMode: e.target.checked
        })
    }

    render() {
        let {selectYear,showData,isOpen,queryHistoryMode}=this.state;
        return [<div className="report-header" style={{margin:'30px 0px 20px 30px'}}>
            <div className="form">
                <span style={{color:'#000',marginRight: 10}}>请选择月份:</span>
                <MonthPicker
                    onChange={this.handleMonthChange}
                    placeholder="请选择月份"  
                    locale={locale} 
                    disabled={!queryHistoryMode}                 
                   >
                </MonthPicker>
                <Checkbox style={{marginLeft: '10px'}} onChange={this.onChangeModal}>查询模式</Checkbox>
            </div>
        </div>,
        <div className="report-content" id="reportChart">
            <div style={{display:'flex',flexFlow:'column',margin:30}}>
                <div style={{display:'flex',height:400,flexShrink:0}}>
                    <ReactEcharts
                        option={showData}
                        style={{height: 400, width: '100%'}}
                        className='react_for_echarts'/>
                </div>
            </div>
        </div>,
        <div style={{display:'flex',height:100, justifyContent:'center',flexShrink:0,marginTop: 30}}>
            <Button type='primary' style={{width: 100}} onClick={this.print}>打印</Button>
        </div>]
    }
}
export default withRouter(ReportContainer)
