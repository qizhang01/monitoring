import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';
import {Input,Button,Checkbox,Row,Col,Icon,message} from 'antd'
import wish from 'src/common/wish'
import { fetchAPI } from "../../ajax/fetchApi"
import Logo from './images/jykl.jpg'

const styles={
    wrap:{
        display:'flex',
        alignItems:'center',
        flexFlow:'column',
        width:'100%',
        height:'100%',
        justifyContent:'center',
    },
    top:{
        flexGrow:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    login:{
        width:368,
        display:'flex',
        justifyContent:'center',
        flexFlow:'column'
    },
    bottom:{
        height:80,
        width:'100%',
        display:'flex',
        justifyContent:'center',
        flexFlow:'column',
        alignItems:'center'
    },
    row:{
        marginBottom:24
    },
    col:{
        textAlign:'center'
    },
    vcenter:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    }
}

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountError: false,
            loading: false,
            account: '',
            password:''
        }
    }
    onChangeAccount = (e)=>{
       this.state.account = e.target.value
    }
    onChangePassword = (e)=>{
        this.state.password = e.target.value
    }
    login=async ()=>{
        const formData = {
            "employee_id": this.state.account,
            "password": this.state.password
        }
        document.location.href=`./index.html#/monitoring/report`

        // const res = await fetchAPI('login', "", "POST", formData)
        // if( res && res.name){
        //     if(res.active){       
        //         document.location.href=`./index.html#/monitoring/summary`
        //     }else{
        //        return  message.warning('本账户处于冻结状态')
        //     }
        // }else{
        //     this.setState({
        //         accountError: true
        //     })
        // }
    }
    render() {
        let {row,col,vcenter}=styles;
        let {accountError,loading} = this.state
        return (
            <div style={styles.wrap}>
                <div style={styles.top}>
                    <div style={styles.login}>
                        <Row style={row}>
                            <Col style={{...col,...vcenter}} span={24}>
                                <img src={Logo} alt="" style={{width: '150px'}}/>
                            </Col>
                        </Row>

                        <Row style={row}>
                            <Col style={{...col,...vcenter}} span={24}><span style={{fontSize:32,marginBottom:50}}>实时监控数据平台</span></Col>
                        </Row>

                        <Row style={row}>
                            <Col span={24}>
                               <Input placeholder="请输入账号..." 
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                    size="large"
                                    onChange={this.onChangeAccount}
                                >
                                </Input>
                            </Col>
                        </Row>
                        <Row style={row}>
                        <Col span={24}>
                            <Input.Password placeholder="请输入密码..." 
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                size="large"
                                onChange={this.onChangePassword}
                            >                                   
                            </Input.Password>
                            { accountError && <span style={{color:'rgb(255, 64, 0, 0.6)',paddingLeft: 8, fontSize:'1rem'}}>账号密码错误,请重新输入</span> }
                        </Col>
                        </Row>
                        <Row style={row}>
                            <Col span={24}><Checkbox>自动登录</Checkbox></Col>
                        </Row>
                        <Row style={row}>
                            <Col span={24}>
                                <Button 
                                    size="large" 
                                    type="primary"
                                    loading = {loading}
                                    style={{width:'100%'}} 
                                    onClick={this.login}>
                                    登录
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div style={styles.bottom}>   
                    <div style={row}>
                        Copyright @ 交银康联人寿保险有限公司
                    </div>    
                </div>
            </div>
        )
    }
};
