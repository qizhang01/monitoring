import React,{PureComponent} from 'react';
import {
    Button,
    Row,
    Form,
    Table,
    Modal,
    Checkbox,
    Divider,
    Input,
    Icon,
    message,
    Popconfirm
} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"
import util from 'src/common/util'
import { connect } from 'react-redux';

const FormItem=Form.Item;
const CheckboxGroup = Checkbox.Group;
const style={
    formItem:{
         labelCol:{span:4},
         wrapperCol:{span:20}
    }
}
const options = ['ADMIN', 'MOBILE','SOFTDEVELOP'];
const data = [{
    employee_id: 1500767,
    name: '张山',
    roles: ['MOBILE'],
    created_at: '2020-2-29',
    last_login: '2020-3-13',
    active: true,
    needModifyRoles:false
},{
    employee_id: 7500700,
    name: '李四',
    roles: ['MOBILE','ADMIN'],
    created_at: '2020-2-29',
    last_login: '2020-3-13',
    active: false,
    needModifyRoles:false
},{
    employee_id: 2500559,
    name: '汪五',
    roles: ['SOFTDEVELOP'],
    created_at: '2020-2-29',
    last_login: '2020-3-13',
    active: true,
    needModifyRoles:false
},{
    employee_id: 3500700,
    name: '黄六',
    roles: ['SOFTDEVELOP'],
    created_at: '2020-2-29',
    last_login: '2020-3-13',
    active: true,
    needModifyRoles:false
}]

class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    state={
        listData:data,
        isShowModel:false,
        employeeList: [],
        addRoles: [],
        defaultPassword: '12345678',
        addEmployeeName: '',
        loading: false,
        inputNum: '' , //输入的工号
        ifSuccessOnce: false  //是否成功新增至少一名
    }
    
    displayItem(item){
        if(item==''){

        }
    }
    columns = [
        {
            title: '工号',
            dataIndex: 'employee_id',
            key: 'employee_id'
        },{
            title: '姓名', 
            dataIndex: 'name',
            key:'name'
        },{
            title: '权限', 
            dataIndex: 'roles',
            key:'roles',
            render: (text, record)=>(
                <CheckboxGroup
                    options={options}
                    value={record.roles}
                    onChange={(e)=>this.onChangeRoles(record,e)}
                />
            )
        },{
            title: '创建时间',
            dataIndex: 'created_at',
            key:'created_at',
            // render:(text, record)=>{
            //     if(text){
            //         const time = util.parseTime(text)
            //         return (<span>{time.day+' '+time.hour}</span>)
            //     }else{
            //         return ''
            //     }
            // }
        },{
            title: '上次登录时间',
            dataIndex: 'last_login',
            key:'last_login',
            // render:(text, record)=>{
            //     if(text){
            //         const time = util.parseTime(text)
            //         return (<span>{time.day+' '+time.hour}</span>)
            //     }else{
            //         return ''
            //     }
            // }
        },{
            title: '状态',
            dataIndex: 'active',
            key:'active',
            render: (text, record)=><span>{record.active? <span style={{color:'green'}}>激活</span>: <span style={{color:'red'}}>冻结</span>}</span>
        },{
            title: '操作',
            key: 'action',
            render: (text, record) => (
              <span>
                <a href="javascript:;" onClick={()=>this.editStatus(record)}>{ record.active?'停用':'启用' }</a>
                <Divider type="vertical"/>
                <a href="javascript:;" onClick={()=>this.initSign(record)}>重置密码</a>
                <Divider type="vertical"/>
                <a href="javascript:;" onClick={()=>this.modifyPermission(record)} disabled={!record.needModifyRoles}>修改权限</a>
                <Divider type="vertical"/>
                <Popconfirm
                    title="确认删除?"
                    onConfirm={this.confirm}
                    onCancel={this.cancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <a href="javascript:;">删除</a>
                </Popconfirm>,
              </span>
            ),
        }
    ]

    componentDidMount(){
        this.getAllUsersList()
    }

    async getAllUsersList(){
       this.props.fetchUsersList()
    }

    async modifyPermission(){

    }
    async confirm(){

    }
    cancel(){

    }
    onChangeRoles= async (record,e) =>{
        this.getNewListData(record,e)
        // const formData = {
        //     id: record.id,
        //     roles: e
        // }
        // const res = await fetchAPI('user','','POST',formData)
        //  //刷新列表
        // this.getAllUsersList()
    }
    
    getNewListData(record,e){
        const {employee_id} = record
        const newData = {
            ...record,
            roles: e,
            needModifyRoles: true
        }
        const d = this.state.listData
        const newListData = d.map(item=>{
            if(item.employee_id==employee_id){
                return newData
            }else{
                return item
            }
        });
        this.setState({
            listData: newListData
        })
    }

    //停用或者激活
    editStatus=async (record)=>{
        const formData = {
           id: record.id,
           active: !record.active
        }

    }

    initSign= async record =>{
        const formData = {
            id: record.id,
            temp_password: '12345678'
        }
        // const res = await fetchAPI('user','','POST',formData)
        // if(res){
        //     message.info('密码重置成功')
        // }
    }

    addRole=()=>{
      this.setState({isShowModel: true})
    }

    submitModel=async ()=>{
        const {inputNum,addEmployeeName,addRoles,defaultPassword} = this.state
        const formData = {
            employee_id: inputNum,
            name: addEmployeeName,
            password: defaultPassword,
            roles: addRoles
        }
        this.setState({loading: true})
        // const res = await fetchAPI('user','','PUT',formData)
        // if(res){
        //     //成功
        //     message.success('成功');
        //     this.setState({

        //     })
        // }else{
        //     message.error('失败');
        //     this.setState({loading: false})
        // }
    }

    cancelModel=()=>{
        this.setState({isShowModel: false})
        //如果新增至少一名 则需要刷新数据
        if(this.state.ifSuccessOnce){
            this.getAllUsersList()
        }    
    }

    onChangeCode=(e)=>{
       this.setState({
            inputNum: e.target.value
       })
    }

    onSelectRoles=(e)=>{
        this.setState({
            addRoles: e
        })
    }

    onChangePassword=(e)=>{
        this.setState({
            defaultPassword: e.target.value
        })
    }
    //输入工号onblur事件
    onBlur = async ()=>{
        // const res = await fetchAPI('employee',this.state.inputNum,'GET',null,'/')
        // if(res){
        //     //这个时候去填写名字
        //     this.setState({addEmployeeName: res.name})
        // }
    }

    render() {
        const {employeeList,isShowModel,inputNum, loading,addEmployeeName,defaultPassword,addRoles,listData} = this.state
        return (
            <div style={{ display: 'flex', flexFlow: 'column', flexGrow: 1, margin: "10px 20px" }}>
                <div style={{minWidth:1140, paddingRight:5,overflow:'hidden'}}>
                    <Row style={{marginBottom: '10px', marginTop: '20px'}}>
                        <Button 
                            type ='primary' 
                            icon="plus"
                            onClick={this.addRole}>
                            新增
                        </Button>
                    </Row>
                    <Row style={{display: 'flex',justifyContent:'flex-end',alignItems:'center',fontSize:'18px', paddingRight:'30px',marginBottom:'20px'}}>
                        注册总人数为:<span style={{margin: '0 10px', fontSize:'24px',color:'#1890ff'}}>{listData.length}</span>人
                    </Row>
                    <Table 
                        columns={this.columns} 
                        dataSource={listData}  
                        bordered 
                        pagination = {
                            {
                                pageSize: 15,
                                showSizeChanger: true,
                            }
                        }
                    >
                    </Table>

                    <Modal
                        title="新增账号"
                        wrapClassName="vertical-center-modal"
                        width='600px'
                        visible={isShowModel}
                        onOk={this.submitModel}
                        onCancel={this.cancelModel}
                        footer={[
                            <Button key="close" onClick={this.cancelModel}>
                               关闭
                            </Button>,
                            <Button key="submit" disabled = {!addEmployeeName||addRoles.length<1} type="primary" loading={loading} onClick={this.submitModel}>
                               注册
                            </Button>,
                        ]}
                    >
                        <Row>
                            <span>输入工号:</span>
                            <Input placeholder="请输入工号" 
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                    onChange={this.onChangeCode}
                                    style={{ width: 200,marginLeft: 10,marginBottom: 10 }}
                                    onBlur = {this.onBlur}
                                    value={inputNum}
                                >
                            </Input>
                        </Row>
                        <Row>
                            <span style={{width: 60, display: 'inline-block',textAlign: 'right'}}>姓名:</span>
                            <Input placeholder="姓名" 
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                    disabled
                                    style={{ width: 200,marginLeft: 10,marginBottom: 10  }}
                                    value={addEmployeeName}
                                >
                            </Input>
                        </Row>
                        <Row>
                            <span>默认密码:</span> 
                            <Input  
                                value={defaultPassword} 
                                onChange = {this.onChangePassword}
                                style={{ width: 200,marginLeft: 10,marginBottom: 10  }}>
                            </Input>
                        </Row>
                        <Row>
                            <span>设置权限:</span>
                            <CheckboxGroup
                                disabled={!addEmployeeName}
                                options={options}
                                value={addRoles}
                                onChange={this.onSelectRoles}
                                style={{marginLeft: 10}}
                            />
                        </Row>
                    </Modal>
                </div>
            </div>
        )    
    }
}


const mapStateToProps = state => ({
    list: state.lists
})
const mapActionToProps = dispatch => ({
    fetchUsersList: value => dispatch({
        type: 'fetch_user_list',
        payload: ''
    })
})

export default connect(mapStateToProps, mapActionToProps)(Index);