import React,{PureComponent} from 'react';
import {Button,Divider,Col,Row} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"
import util from 'src/common/util'
import MonitroingLeft from './MonitroingLeft'
import Panel from 'src/common/Components/panel'

const formItemLayout = { labelCol: { sm: { span: 6 } }, wrapperCol: { sm: { span: 18 } } };
const style = {
    border: {
        border:'1px solid',
        padding: '10px 0'
    },
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
                    <Col span={11}>
                        <div style={{display: 'flex', flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'10px 0'}} className='list-item'>
                            <span>{item.idenfidy}</span>
                            <span>{item.type}</span>
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

    const arr = d.map( item => <SingleLine data= {item}></SingleLine>)
    return (
        <div style={style.border}>
            <HeaderTitle text='交银人寿今日数据' ifShowStatus={false}></HeaderTitle>
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
        <div style={style.border}>
            <HeaderTitle text='应用服务状态监控' ifShowStatus={true}></HeaderTitle>
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
    idenfidy: '正常'
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


export default class IndexStatistics extends React.Component {
    constructor(props) {
        super(props);
    }

    state={
        
    }

    componentDidMount(){

    }

    componentWillUnmount(){

    }

    render() {
        let {

        }=this.state;
        return (           
                <Row type='flex' justify='space-around'>
                    <Col span={6}>
                        <div style={{border: '1px solid'}}>
                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>
                        </div>
                    </Col>
                    <Col span={10}>
                        <div style={style.marginBottom}>
                            <span>本月出单总量</span>
                        </div>
                        <div style={style.marginBottom}>
                            <Panel title='本月各系统出单总量'></Panel>
                        </div>
                        <div style={style.marginBottom}> 
                            <Panel title='实时访客量'></Panel>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div >
                            <JyDayData data={data} lineNum={2}></JyDayData>
                        </div>
                        <div style={{marginTop: '10px'}}>
                            <ServiceStatus data={status} lineNum={2}></ServiceStatus>
                        </div>
                    </Col>
                </Row>    
            )
    }
}
