import React,{PureComponent} from 'react';
import {Button,Divider,Col,Row} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"
import util from 'src/common/util'
import MonitroingLeft from './MonitroingLeft'

const formItemLayout = { labelCol: { sm: { span: 6 } }, wrapperCol: { sm: { span: 18 } } };

const ShowTopic = ({text,number})=>{
   return (
       <div style={{display: 'flex',flexDirection:'column'}}>
           <span>{number}</span>
           <span>{text}</span>
       </div>
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
                        <div style={{border: '1px solid'}}>
                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>

                            <MonitroingLeft></MonitroingLeft>
                        </div>
                    </Col>
                    <Col span={10}>
                        <div>
                            <span>本月出单总量</span>
                        </div>
                        <div>
                            <span>本月各系统出单总量</span>
                        </div>
                        <div>
                            <span>实时访客量</span>
                        </div>
                    </Col>
                    <Col span={6}>
                        <div>今日数据</div>
                        <div>状态监控</div>
                    </Col>
                </Row>    
            )
    }
}
