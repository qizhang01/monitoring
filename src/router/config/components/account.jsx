import React,{PureComponent} from 'react';
import {
    Button, 
    Table,
    Divider,
    Modal,
    InputNumber,
    Select,
    Checkbox 
} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"

function columns(){
    return [
        {
            title: '房间',
            dataIndex: 'room',
            key: 'room',
            width: 140,
            fixed: 'left'
        }, {
            title: '座位号',
            dataIndex: 'seat_num',
            width: 150,
            key: 'seat_num'
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 150,
            render:(value)=>{
                if(value==='ADULT') return '成人'
                if(value==='CHILD') return '儿童'
                return value
                // return value.map(item=>item.name).join(' , ')
            }
        }, {
            title: '标签',
            dataIndex: 'tags',
            key: 'tags',
            render:(value)=>value.join(' , ')
        }, {
            title: '状态',
            dataIndex: 'status',
            width: 200,
            key: 'status',
            render:(value)=>{
                return value
            }
        }, {
            title: '操作',
            dataIndex: 'enabled',
            key: 'enabled',
            render: (value,record) => (<span>
                <a href="javascript:;"  disabled onClick={()=>{this.onEdit(record)}}>编辑</a>
                <Divider type="vertical"/>
                {record.status=="AVAILABLE" && <a href="javascript:;" onClick={()=>this.delete(record)}>删除</a>}
            </span>)
        }
    ]
};

export default class Index extends React.Component {
    state={
        dataSource:[],
        isShowModel: false,
        selectedRowKeys: [],
        operateType: ''
    }
    constructor(props) {
        super(props);
        this.columns=columns.bind(this);
    }

    addSeatInfo = {
        startNum: '',
        endNum:'',
        roomType: '',
        roomRole: '',
        status:''
    }

    componentDidMount(){
        this.loadSeatList()
    }

    onEdit = (record) => {
        this.setState({
        })
    }

    async loadSeatList(){
        const seats = await fetchAPI('seats')

        this.setState({
            dataSource: seats
        })
    }

    operate=(type)=>{
        this.setState({
            isShowModel: true,
            operateType: type
        })
    }

    delete=async (record)=>{
        const {seat_num} = record
        console.log(record)
        const res = await fetchAPI('seat', seat_num, 'DELETE',null, "/")
        if(res){
            //如果成功,删除
            this.loadSeatList()
        }
    }

    onCreateFormSubmit=()=>{
        let {validateFields,getFieldsValue}=this.refs.createForm;
        validateFields(
          (err) => {
            if (!err) {
                let data=getFieldsValue();
                if(this.state.userId){
                    this.updateAccount(this.state.userId,data);
                }else{
                    this.submitAccount(data);
                }
            }
          }
        )
    }

    async submitModel(){
        const {startNum,endNum,roomType,roomRole,status} = this.addSeatInfo
        const max = Math.max(startNum,endNum)
        const min = Math.min(startNum,endNum)
        const {operateType} = this.state
        let res, param; 
        if(operateType=='add'){
            param = {
                start_seat_num: min,
                end_seat_num: max,
                room: roomType,
                tags: roomRole,
                status,
            }
            res = await fetchAPI('seat', '', 'PUT',null)
        }else if(operateType=='del'){

            param=`start_seat_num=${min}&end_seat_num=${max}`
            res = await fetchAPI('seat',param,'POST',null, '/')

        }else if(operateType=='use'){
            //启用一片
            param=`start_seat_num=${min}&end_seat_num=${max}`
            res = await fetchAPI('seatEnabled',param,'POST',null, '/')

        }else {
            //停用一片
            param=`start_seat_num=${min}&end_seat_num=${max}`
            res = await fetchAPI('seatDisable',param,'POST',null, '/')
        }
        if(res){
            console.log(res)
            this.setState({isShowModel: false})
            this.loadSeatList()
        }
    }
    
    getTitle=(type)=>{
        let title = ''
        switch(type){
            case 'add':
                title='添加座位';
                break;
            case 'del':
                title='删除座位';
                break;
            case 'use':
                title='启用座位';
                break;
            case 'nouse':
                title='停用座位'
                break;
        }
        return title
    }

    cancelModel = () => {
       this.setState({
           isShowModel: false
       })
    }

    changeStartSeatNum = (e)=>{
       this.addSeatInfo.startNum = e.target.value
    }

    changeEndSeatNum = (e)=>{
        this.addSeatInfo.endNum = e.target.value
    }

    selectRoomType = (e)=>{
        this.addSeatInfo.roomType = e
    }

    changeCheckbox = (e)=>{
        this.addSeatInfo.roomRole = e
    }

    changeStatus = (e)=>{
        this.addSeatInfo.status = e
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };
   
    render() {
        let {dataSource,selectedRowKeys,operateType}=this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        return <div style={{ display: 'flex', flexFlow: 'column', flexGrow: 1, margin: "10px 20px" }}>
            <div style={{ height: 40 }}>
                <Button type="primary" onClick={()=>this.operate('add')}>添加</Button>
                <Button  onClick={()=>this.operate('del')}>删除</Button>
                <Button onClick={()=>this.operate('use')}>启用</Button>
                <Button onClick={()=>this.operate('nouse')}>停用</Button>
            </div>
            <div style={{ flexGrow: 1, background: '#fff' }}>
                <Table 
                   className='sale-record_tableTh'
                   dataSource={dataSource} 
                   columns={this.columns()} 
                   rowSelection={rowSelection}
                   pagination = {
                       {
                         pageSize: 15,
                         showSizeChanger: true,
                       }
                   }
                />
            </div>
            <div>自动分配将按照列表从上往下顺序选取座位</div>
            <Modal
                title={this.getTitle(operateType)}
                wrapClassName="vertical-center-modal"
                width='600px'
                visible={this.state.isShowModel}
                onOk={this.submitModel}
                onCancel={this.cancelModel}
                cancelText="取消"
                okText="确定"
                >
                <WrappedForm 
                    ref="editForm" 
                    changeStartSeatNum = {(e)=>this.changeStartSeatNum(e)}
                    changeEndSeatNum = {(e)=>this.changeEndSeatNum(e)}
                    selectRoomType = {(e)=>this.selectRoomType(e)}
                    changeCheckbox = {(e)=>this.changeCheckbox(e)}
                    changeStatus = {e=>this.changeStatus(e)}
                    addSeat={ operateType=="add" }
                >
                </WrappedForm>
            </Modal>
        </div>
    }
}

const stl = {
    margin: { marginBottom: 10 },
    width: {
        width: 85,
        display: 'inline-block',
        textAlign: 'right',
        marginRight: 5
    }
}
class WrappedForm extends React.Component{
    constructor(props){
      super(props)
      this.state={
        numArr: []
      }
    }
    options =[
        { label: '氧气室', value: '氧气室' },
        { label: '青霉素', value: '青霉素' },
        { label: '轮椅', value: '轮椅' },
    ]
    render(){

      return (
        <div>
            <div style={stl.margin}>
                <span style={stl.width}>座位起始号:</span>
                <InputNumber  onChange={this.props.changeStartSeatNum}></InputNumber >
            </div>
            <div style={stl.margin}>
                <span style={stl.width}>座位结束号:</span>
                <InputNumber onChange={this.props.changeEndSeatNum}></InputNumber >
            </div>
            <div style={ this.props.addSeat? null: {display: 'none'}} >
                <div style={stl.margin}>
                    <span style={stl.width}>室类别:</span>
                    <Select placeholder="请选择" style={{ width: 200 }} onChange={this.props.selectRoomType}>
                        <Select.Option value="CHILD">儿童室</Select.Option>
                        <Select.Option value="ADULT">大厅</Select.Option>
                    </Select>,
                </div>
                <div style={stl.margin}>
                    <span style={stl.width}>室功能:</span>
                    <Checkbox.Group options={this.options} defaultValue={[]} onChange={this.props.changeCheckbox} />
                </div>
                <div>
                    <span style={stl.width}>状态:</span>
                    <Select placeholder="请选择" style={{ width: 200 }} onChange={this.props.changeStatus}>
                        <Select.Option value="AVAILABLE">可用</Select.Option>
                        <Select.Option value="DISABLED">不可用</Select.Option>
                    </Select>,
                </div>
            </div>    
        </div>
      )
    }
  }