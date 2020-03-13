import React,{PureComponent} from 'react';
import {Button,Divider,Col,Row} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"
import util from 'src/common/util'
import MonitroingLeft from './MonitroingLeft'
import Panel from 'src/common/Components/panel'
import Report from './report'
import ReactEcharts from 'echarts-for-react';
import showDataMonth from '../config/configMonth'
import showDataDay from '../config/configDay'

const formItemLayout = { labelCol: { sm: { span: 6 } }, wrapperCol: { sm: { span: 18 } } };
const style = {
    marginBottom: {
        marginBottom: '10px'
    }
}
const SingleLine = (props)=>{
    const {data, color} = props
    return (
        <Row type='flex' justify='center' className='list-line'>
            {
                data.map( item => (
                    <Col span={12}>
                        <div style={{display: 'flex', flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'11px 0'}} className='list-item'>
                            <span style={{color: item.idenfidy=='异常'?"#F90BFD":'#1E95FF', fontSize: '20px',marginBottom: '10px',fontWeight:'bold'}}>{item.idenfidy}</span>
                            <span style={{ color:'#7CA1D2', fontSize: '16px'}}>{item.type}</span>
                        </div>
                    </Col>
                ))
            }
        </Row>
    )
}

//lineNum代表每行有几个数据，默认是2
const JyDayData = ({ data, lineNum })=>{
    const d = getDataStructure(data, lineNum)
    const arr = d.map( (item,index) => <SingleLine key={index} data= {item}></SingleLine>)
    return (
        <div>
            <Row>
                {arr}
            </Row>
        </div>
    )
}
//
const ServiceStatus = ({ data, lineNum })=>{
    const d = getDataStructure(data, lineNum)
    const arr = d.map( item => <SingleLine data= {item}></SingleLine>)
    return (
        <div>
            <Row>
                {arr}
            </Row>
        </div>
    )
}
const HeaderTitle=({text, ifShowStatus})=>{
    return (
        <Row style={{ marginBottom: '10px'}}>
            <span>{text}</span>
            { ifShowStatus && <span>
                   <span>正常</span>
                   <span>异常</span>
                </span>
            }
        </Row>
    )
}

const getDataStructure = (data, lineNum)=>{
    let arr = []
    let tempArr = []
    for(let i =0; i<data.length; i++){
        if( i%lineNum ===0 && i>0){
            arr.push(tempArr)
            tempArr=[]
            tempArr.push(data[i])
        }else{
            tempArr.push(data[i])
        }
    }
    arr.push(tempArr)
    return arr
}

let data = [{
    type: '上传步数人数',
    idenfidy: 18725
},{
    type: '获得健走积分人数',
    idenfidy: 138
},{
    type: '兑换礼品人数',
    idenfidy: 187
},{
    type: '好生活答题通关人数',
    idenfidy: 1265
}]

let status = [{
    type:'产品服务',
    idenfidy: '正常'
},{
    type:'订单服务',
    idenfidy: '异常'
},{
    type:'核保服务',
    idenfidy: '正常'
},{
    type:'承保服务',
    idenfidy: '正常'
},{
    type:'MQ服务',
    idenfidy: '正常'
},{
    type:'支付服务',
    idenfidy: '正常'
},{
    type:'签名服务',
    idenfidy: '正常'
},{
    type:'Ecif服务',
    idenfidy: '正常'
},{
    type:'保单服务',
    idenfidy: '正常'
},{
    type:'递延税服务',
    idenfidy: '正常'
},{
    type:'中信信托服务',
    idenfidy: '正常'
},{
    type:'Ecif服务',
    idenfidy: '正常'
}]

const title = {
    t1: '前置负载均衡',
    t2: '网关1.2.0负载均衡',
    t3: '网关1.3.0负载均衡',
    t4: '前置负载均衡'
}

const arr=[
    {  
        title: title.t1,
        width: '45px',
        showData: [{
            value: 30,
            name:'102.199.8.45',
        },{
            value: 40,
            name:'152.18.8.40',
        },{
            value: 30,
            name:'12.18.8.66',
        }]
    },

    {
        title: title.t2,
        width: '60px',
        showData: [{
            value: 70,
            name:'102.199.8.45',
        },{
            value: 20,
            name:'152.18.8.40',
        },{
            value: 10,
            name:'12.18.8.66',
        }],
    },

    {
        title: title.t3,
        width: '60px',
        showData: [{
            value: 40,
            name:'102.199.8.45',
        },{
            value: 20,
            name:'152.18.8.40',
        },{
            value: 40,
            name:'12.18.8.66',
        }]
    },

    {  
        title: title.t4,
        width: '45px',
        showData: [{
            value: 30,
            name:'102.199.8.45',
        },{
            value: 40,
            name:'152.18.8.40',
        },{
            value: 30,
            name:'12.18.8.66',
        }]
    }
]
const OrderTotalNumber = (props)=>{
    let {number} = props
    const str = number.toString().split('')
    const stl = {
        topic:{
            fontSize:'25px',
            fontWeight: '500', 
            color: '#0A8CFF',
            marginRight:'15px'
        },
        item:{
            position: 'relative',
            top: '5px',
            fontSize: '40px',
            display:'inline-block',
            width: '50px',
            height: '70px',
            border: '1px solid #1A3F72',
            marginLeft: '10px',
            fontWeight: 'bold',
            paddingLeft: '12px',
            color: '#45F0EA',
            backgroundColor: 'rgba(41,85,252,0.18)'
        }
    }
    return (
        <Row>
            <span style={stl.topic}>本月出单总量</span>
            {str.map((item,index)=><span key={index} style={stl.item}>{item}</span>)}
        </Row>
    )
}

export default class IndexStatistics extends React.Component {
    constructor(props) {
        super(props);
    }

    state={
        showDataMonth: showDataMonth,
        showDataDay: showDataDay
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }
    
    getDayShowData(){

    }

    render() {
        let {
            showDataMonth,
            showDataDay
        }=this.state;
        return (           
                <Row type='flex' justify='space-around'>
                    <Col span={6}>
                        <Panel title='网关服务健康状况'>
                            { arr.map( (item,index) => 
                                <MonitroingLeft 
                                    key={index}
                                    title={item.title}
                                    data={item.showData}
                                    width={item.width}
                                /> )
                            }
                        </Panel>
                    </Col>
                    <Col span={11}>
                        <div style={style.marginBottom}>
                            <Panel>
                                <OrderTotalNumber number="009876"></OrderTotalNumber>
                            </Panel>
                        </div>
                        <div style={style.marginBottom}>
                            <Panel title='本月各系统出单量'>
                                <div style={{display:'flex',height:300,flexShrink:0}}>
                                    <ReactEcharts
                                        option={showDataMonth}
                                        style={{height: 300, width: '100%'}}
                                        className='react_for_echarts'/>
                                </div>
                            </Panel>
                        </div>
                        <div style={style.marginBottom}> 
                            <Panel title='今日实时访客量(万次/5分钟)'>
                                <div style={{display:'flex',height:300,flexShrink:0}}>
                                    <ReactEcharts
                                        option={showDataDay}
                                        style={{height: 300, width: '100%'}}
                                        className='react_for_echarts'/>
                                </div>
                            </Panel>    
                        </div>
                    </Col>
                    <Col span={6}>
                        <Panel title='交银人寿今日数据'>
                            <JyDayData data={data} lineNum={2}></JyDayData>
                        </Panel>
                        <div style={{marginTop: '15px'}}></div>
                        <Panel title='应用服务状态监控' schematic={true}>
                            <ServiceStatus data={status} lineNum={2}></ServiceStatus>
                        </Panel>
                    </Col>
                </Row>    
            )
    }
}
