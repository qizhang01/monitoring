import React,{PureComponent} from 'react';
import {Button,Divider,Col,Row} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"
import util from 'src/common/util'
import MonitroingLeft from './MonitroingLeft'
import Panel from 'src/common/Components/panel'
import Report from './report'

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

const OrderTotalNumber = (props)=>{
    let {number} = props
    const str = number.toString().split('')
    const stl = {
        fontSize: '40px',
        display:'inline-block',
        width: '48px',
        height: '60px',
        border: '1px solid',
        marginLeft: '5px',
        fontWeight: 'bold',
        paddingLeft: '10px'
    }
    return (
        <Row>
            <span style={{ fontSize:'25PX',fontWeight: 'bold' }}>本月出单总量</span>
            {str.map(item=><span style={stl}>{item}</span>)}
        </Row>
    )
}

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
                        <Panel>
                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>
                        </Panel>
                    </Col>
                    <Col span={10}>
                        <div style={style.marginBottom}>
                            <Panel>
                                <OrderTotalNumber number="009876"></OrderTotalNumber>
                            </Panel>
                        </div>
                        <div style={style.marginBottom}>
                            <Panel title='本月各系统出单量'>
                                <Report></Report>
                            </Panel>
                        </div>
                        <div style={style.marginBottom}> 
                            <Panel title='今日实时访客量(万次/5分钟)'></Panel>
                        </div>
                    </Col>
                    <Col span={6}>
                        <Panel title='交银人寿今日数据'>
                            <JyDayData data={data} lineNum={2}></JyDayData>
                        </Panel>
                        <div style={{marginTop: '10px'}}></div>
                        <Panel title='应用服务状态监控' >
                            <ServiceStatus data={status} lineNum={2}></ServiceStatus>
                        </Panel>
                    </Col>
                </Row>    
            )
    }
}
