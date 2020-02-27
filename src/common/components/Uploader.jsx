import React from 'react';
import { Breadcrumb, Popover, Menu, Button, Select, Tabs, Row, Col, Divider, Table, Icon, Input, Upload } from 'antd'
import APIService from 'src/common/api/service.js'

let headers = {
    ContentType: 'multipart/form-data; boundary=9431149156168'
}

const action = "http://test-jr-resource.oss-cn-shanghai.aliyuncs.com";

export default class OOSUploader extends React.Component {
    state = {
        imageUrl: '',
        loading: false,
        isPreview:false,
        formdata: {
            'policy': '',
            'OSSAccessKeyId': '',
            'success_action_status': '200',
            'signature': '',
            'callback': ''
        }
    }

    constructor(props){
        super(props);
    }

    uploadButton = () => {
        if(this.props.isNull){
            return <div>
                <div className="ant-upload-text">没有图片</div>
            </div>
        }else{
            return <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                <div className="ant-upload-text">添加图片</div>
            </div>
        }
    }
    uploadChange = ({file}) => {
        if (file.status == 'done') {
            let { data } = file.response;
            let url = action + '/' + data.path
            this.setState({imageUrl: url})
        }
    }

    beforeUpload = () => {
        return new Promise((resolve, reject) => {
            APIService.getOSSToken(this.props.id || '123').then(res => {
                let {data} = res;
                this.setState({
                    formdata: {
                        'policy': data.policy,
                        'OSSAccessKeyId': data.accessid,
                        'success_action_status': '200',
                        'signature': data.signature,
                        'callback': data.callback,
                        'Filename': new Date().getTime(),
                        'key': new Date().getTime()
                    }
                })
                resolve(res)
            })
        })
    }

    loadData(id){
        APIService.getOSSImage(id).then(res=>{
            if(res.code=='success'){
                let data=res.data;
                let url='';
                if(data.length>0){
                    url=action+'/'+data[0].path;
                }
                this.setState({
                    imageUrl:url
                })
            }
        })
    }
    componentDidMount() {
          let {id}=this.props;
          if(id){
                this.loadData(id)
          }
    }

    componentWillReceiveProps(nextProps){
        let {id}=nextProps;
        if(id){
              this.loadData(id)
        }
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextState.imageUrl!=this.state.imageUrl){
            return true
        }
        if(!nextState.formdata){
            return false;
        }else if(nextState.formdata.key==this.state.formdata.key){
            return false;
        }else{
            return true
        }
      }
    render() {
        let {imageUrl}=this.state;
        let {id,disabled,isNull}=this.props;
        return <Upload accept="image/*" disabled={disabled} onMouseOver={this.onOver}  ref="pppp" name="file" listType="picture-card" className="avatar-uploader" showUploadList={false} onChange={this.uploadChange} data={this.state.formdata} headers={headers} beforeUpload={this.beforeUpload} action={action}>
            { imageUrl ? <Popover placement="right" content={<img src={imageUrl} style={{maxWidth:640}}/>}><img src={imageUrl} onMouseOver={this.onOver} style={{ width: 86, height: 88 }}/></Popover> : this.uploadButton() }
        </Upload>
    }

}
