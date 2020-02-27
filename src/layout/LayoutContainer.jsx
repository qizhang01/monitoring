import 'src/layout/styles/layout.less';
import React, {Component, PropTypes} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Layout, Menu, Icon,Avatar,Dropdown} from 'antd';
import RouteLayout from 'src/layout/RouteLayout'
import { fetchAPI } from "src/ajax/fetchApi"
import Logo from "src/common/images/u3903.png";

const {Header, Sider, Content} = Layout;

class LayoutContainer extends React.Component {
    constructor(props) {
        super(props);
        this.keys=[
            'monitoring/auth/uc',
            'monitoring/report',
            ]
        this.state = {
            collapsed: false,
            offline: false
        };
    }
    componentWillMount(){

    }

    componentDidMount(){
        //监控网络状态
        window.addEventListener('offline',function(e){
            this.setSate({
                offline: true
            })
        })
        window.addEventListener('online',function(e){
            this.setSate({
                offline: false
            })
        })
    }
    

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    logout=async ()=>{
        const res = await fetchAPI('logout','','POST')
        document.location.href='./login.html'
    }

    menus=()=>(
        <Menu>
            <Menu.Item>
                <Link to="/uc/passwordChange"><a  href="javascript:;" style={{color:'#000'}}><Icon type='edit' theme="twoTone" twoToneColor="#52c41a"></Icon>修改密码</a></Link>
            </Menu.Item>
            <Menu.Item>
                <a href="javascript:;"  style={{color:'#000'}} onClick={this.logout}><Icon type="thunderbolt" theme="twoTone"/> 退出</a>
            </Menu.Item>
        </Menu>
    )

    render() {
        const {Offline,permitConfig} = this.state;

        let key = this.keys.find(item=>{
            return this.props.location.pathname.replace(/^\//,'').startsWith(item);
        });

        let openKeys=[];

        if(key){
            if(key.includes('auth')){
                openKeys.push('auth')
            }
        }else{
           key='monitoring/report';
           openKeys.push('monitoring')
        }

        return (
            <Layout className="app-layout">
                <Sider style={{display:(key=='editor'?'none':'')}} trigger={null} collapsible="collapsible" collapsed={this.state.collapsed}>
                    <div className="logo">
                        <img src={Logo} alt=""/>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={[key]} defaultOpenKeys={openKeys}>

                        <Menu.SubMenu key="monitoring" title={<span><Icon type="line-chart" /><span>数据监控</span></span>}>
                            <Menu.Item key="monitoring/report"><Link to="/monitoring/report" className="app-link">总览</Link></Menu.Item>
                            <Menu.Item key="monitoring/report/view"><Link to="/monitoring/report/view" className="app-link"> 月趋势</Link></Menu.Item>
                            <Menu.Item key="monitoring/report/dayTrend"><Link to="/monitoring/report/dayTrend" className="app-link"> 日趋势</Link></Menu.Item>
                        </Menu.SubMenu>

                        <Menu.SubMenu key="auth"  title={<span><Icon type="edit" /><span>设置</span></span>}>
                            <Menu.Item key="monitoring/auth/uc"><Link to="/monitoring/uc/admin" className="app-link">权限管理</Link></Menu.Item>
                        </Menu.SubMenu>
                        
                    </Menu>
                </Sider>
                <Layout>
                    <Header className="app-header"  style={{display:(key=='editor'?'none':''),background:'#fff'}}>
                        <div>
                            <Icon  style={{display:(key=='editor'?'none':''), color:'#000'}} className="trigger" type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} onClick={this.toggle}/>
                        </div>
                        <div>
                            <span style ={{ color: "#1890ff", paddingRight: 20}}>交银康联监控管理系统</span>
                            <Icon type={Offline?'close':'wifi'} style={Offline?null:{color:'green'}}></Icon>
                            <Dropdown overlay={this.menus()} placement="bottomRight">
                                <Avatar style={{cursor:'pointer'}} size="small" icon="user"></Avatar>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content className="layout-content">
                        <RouteLayout></RouteLayout>
                    </Content>
                </Layout>
            </Layout>);
    }
}

export default withRouter(LayoutContainer)