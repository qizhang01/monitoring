import React,{PureComponent} from 'react';
import {
    Button,
    Icon,
    Form,
    Row,
    Input,
    message
} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"

const formItemLayout = {
  labelCol: { span: 9},
  wrapperCol: { span: 12, offset:1},
};
const stl = {
  width: '250px',
  marginBottom: '10px'
}
class Index extends PureComponent{
    constructor(props) {
        super(props);
    }

    handleSubmit= e =>{
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.updatePassword(values)
        }
      });
    }
    
    async updatePassword(values){
      const {current_password,id,new_password,new_password_confirm} = values
      if(new_password==new_password_confirm){
        const formData = {
          id: Number(id),
          current_password,
          new_password,
        }
        // let res = await fetchAPI('password',"",'POST',formData)
        // if(res) {
        //   message.success('密码修改成功')
        // }
      }else{
        message.info('新密码两次输入不相同,请重新输入')
      }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const {id} = window.loginInfo
        return (
            <div style={{ display: 'flex', flexFlow: 'column', flexGrow: 1, margin: "10px 20px" }}>
                <Row style={{marginBottom: '20px',fontSize: '26px',fontWeight:'bold'}}>修改密码</Row>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="工号">
                        {getFieldDecorator('id', {
                            initialValue: id,
                            rules: [
                              {
                                required: true,
                                message: '请输入工号',
                              },
                            ],
                        })(<Input placeholder="请输入工号"  disabled={true} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} style={stl} />)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="原密码">
                        {getFieldDecorator('current_password', {
                            rules: [
                              {
                                required: true,
                                message: '请输入旧密码',
                              },
                            ],
                        })(<Input.Password placeholder="请输入旧密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} style={stl}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="新密码">
                        {getFieldDecorator('new_password', {
                            rules: [
                              {
                                required: true,
                                message: '请输入新密码',
                              },
                            ],
                        })(<Input.Password placeholder="请输入新密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} style={stl}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="确认新密码" disabled>
                        {getFieldDecorator('new_password_confirm', {
                            rules: [
                              {
                                required: false,
                                message: '请再次输入新密码',
                              },
                            ],
                        })(<Input.Password placeholder="请再次输入新密码" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} style={stl}/>)}
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 6, offset: 10 }} style={{marginTop: 20}}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )    
    }
}

export const PasswordChange = Form.create({ name: 'Index' })(Index);