import React,{PureComponent} from 'react';
import {Button,  Input,Form ,Radio ,Select,} from 'antd';
import { fetchAPI } from "src/ajax/fetchApi"

class IndexTable extends React.Component {
    constructor(props) {
        super(props);
    }

    state={
        checkNick: false,
        his_prescription_days:'',
        print_mode:'',
        seat_arrangement:'',
        recycle_seat_hours:'',
        has_injection_queue:'',
        require_injection_desk_num:'',
        call_repeat_times:'',
        queue_prepare_patients:'',
        requeue_position:'',
        paediatrics_departments:'',
        min_password_len:'',
        infusion_barcode_len: '7',
        bag_barcode_len: '8',
        banned_login_failure:''
    }

    // his_prescription_days	int	登记时，查询处方的默认天数
    // print_mode	enum	DRIECT直接打印，不预览；PREVIEW 预览
    // seat_arrangement	enum	MANUEL 手动分配，不自动推荐；ASSISTANT 系统自动推荐，允许手工调整；AUTO 自动分配座位，不可修改
    // recycle_seat_hours	int	回收座位时，默认的时间值，以小时为单位，登记时间超过此数值的座位被回收。
    // has_injection_queue	bool	输液是否排队
    // has_queue_tv	bool	是否有排队叫号大屏
    // requeue_position	int	过号患者，重新加入排队时，延后几个位次
    // require_injection_desk_num	bool	是否支持穿刺台号
    // call_repeat_times	int	重复呼叫次数
    // queue_prepare_patients	int	呼叫时，提示准备患者人数，0表示不提示准备

    // paediatrics_departments	int array	儿科科室编号
    // min_password_len	int	密码最短长度
    // infusion_barcode_len	int	输液凭证的条码位数，不可与bag_barcode_len相同
    // bag_barcode_len	int	输液袋标签的条码位数，不可与infusion_barcode_len相同
    // banned_login_failure	int	用户被锁定前允许连续输错密码次数
    async componentDidMount(){
        const respone = await fetchAPI('setting')
        const {
            his_prescription_days,
            print_mode,
            seat_arrangement,
            recycle_seat_hours,
            has_injection_queue,
            has_queue_tv,
            require_injection_desk_num,
            call_repeat_times,
            queue_prepare_patients,
            requeue_position,
            paediatrics_departments,
            min_password_len,
            infusion_barcode_len,
            bag_barcode_len,
            banned_login_failure
        } = respone

        this.setState({
            his_prescription_days,
            print_mode,
            seat_arrangement,
            recycle_seat_hours,
            has_injection_queue,
            has_queue_tv,
            require_injection_desk_num,
            call_repeat_times,
            queue_prepare_patients,
            requeue_position,
            paediatrics_departments,
            min_password_len,
            // infusion_barcode_len,
            // bag_barcode_len,
            banned_login_failure
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.updateSettings(values)
          }
        });
    };
    
    async updateSettings(values){
        const res = await fetchAPI('setting','',"POST",values)
        if(res){
            message.success('系统设置成功');
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 12},
        };
        const {
            his_prescription_days,
            print_mode,
            seat_arrangement,
            recycle_seat_hours,
            has_injection_queue,
            has_queue_tv,
            require_injection_desk_num,
            call_repeat_times,
            queue_prepare_patients,
            requeue_position,
            paediatrics_departments,
            min_password_len,
            infusion_barcode_len,
            bag_barcode_len,
            banned_login_failure
        } = this.state
        return <div style={{ display: 'flex', flexFlow: 'column', flexGrow: 1, margin: "10px 20px" }}>
            <div style={{ flexGrow: 1, background: '#fff' }}>
                {/* <Form.Item {...formItemLayout} label="服务器地址">
                    {getFieldDecorator('address', {
                        rules: [
                        {
                            required: true,
                            message: '请输入服务器地址',
                        },
                        ],
                    })(<Input placeholder="请输入服务器地址" />)}
                </Form.Item> */}
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item {...formItemLayout} label="查询天数">
                        {getFieldDecorator('his_prescription_days', {
                            initialValue: his_prescription_days,
                            rules: [
                                {
                                    required: true,
                                    message: '请输入查询天数',
                                },
                            ],
                        })(<Input placeholder="请输入查询天数" style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="打印方式">
                        {getFieldDecorator('print_mode',{
                            initialValue: print_mode
                        })(
                            <Radio.Group>
                                <Radio value="DIRECT">直接打印</Radio>
                                <Radio value="PREVIEW ">事先预览</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="座位分配">
                        {getFieldDecorator('seat_arrangement',{
                            initialValue: seat_arrangement
                        })(
                            <Radio.Group>
                                <Radio value="AUTO">全自动</Radio>
                                <Radio value="ASSISTANT">自动推荐后可手工修改</Radio>
                                <Radio value="MANUEL">不分配座位,自由坐</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="登记座位回收(小时)" hasFeedback>
                        {getFieldDecorator('recycle_seat_hours', {
                            initialValue: recycle_seat_hours,
                            rules: [{ required: true, message: 'Please select your country!' }],
                        })(
                            <Select placeholder="请选择" style={{ width: 200 }}>
                                <Select.Option value="5">5</Select.Option>
                                <Select.Option value="10">10</Select.Option>
                            </Select>,
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="穿刺排队">
                        {getFieldDecorator('has_injection_queue',{
                            initialValue: has_injection_queue ? 'true': 'false',
                        })(
                            <Radio.Group>
                                <Radio value="true">需要排队</Radio>
                                <Radio value="false">不用排队</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="排队叫号大屏">
                        {getFieldDecorator('has_queue_tv',{
                            initialValue: has_queue_tv ? 'true': 'false',
                        })(
                            <Radio.Group>
                                <Radio value="true">有</Radio>
                                <Radio value="false">没有</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="需要输液台号">
                        {getFieldDecorator('require_injection_desk_num',{
                            initialValue: require_injection_desk_num ? 'true': 'false'
                        })(
                            <Radio.Group>
                                <Radio value="true">是</Radio>
                                <Radio value="false">否</Radio>
                            </Radio.Group>,
                        )}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="排队重复呼叫次数">
                        {getFieldDecorator('call_repeat_times', {
                            initialValue: call_repeat_times,
                            rules: [
                            {
                                required: true,
                                message: '请输入重复遍数',
                            },
                            ],
                        })(<Input placeholder="请输入重复遍数" style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="排队呼叫准备人数">
                        {getFieldDecorator('queue_prepare_patients', {
                            initialValue:queue_prepare_patients,
                            rules: [
                            {
                                required: true,
                                message: '请输入提前准备人数',
                            },
                            ],
                        })(<Input placeholder="请输入提前准备人数" style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="重新加入排队排在第">
                        {getFieldDecorator('requeue_position', {
                            initialValue:requeue_position,
                            rules: [
                            {
                                required: true,
                                message: '请输入重复排队处于位数',
                            },
                            ],
                        })(<Input placeholder="请输入重复排队处于位数" style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="儿科科室编号">
                        {getFieldDecorator('paediatrics_departments', {
                            initialValue: paediatrics_departments,
                            rules: [
                            {
                                required: true,
                                message: '请输入儿科科室编号',
                            },
                            ],
                        })(<Input placeholder="请输入儿科科室编号" style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="密码最短长度">
                        {getFieldDecorator('min_password_len', {
                            initialValue: min_password_len,
                            rules: [
                            {
                                required: true,
                                message: '请输入密码最短长度',
                            },
                            ],
                        })(<Input placeholder="请输入密码最短长度" type='number' min='1' style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="输液凭证的条码位数">
                        {getFieldDecorator('infusion_barcode_len', {
                            initialValue: bag_barcode_len,
                            rules: [
                            {
                                required: true,
                                message: '请输入输液凭证的条码位数',
                            },
                            ],
                        })(<Input placeholder="请输入输液凭证的条码位数" diabled style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="输液袋标签的条码位数">
                        {getFieldDecorator('bag_barcode_len', {
                            initialValue: bag_barcode_len,
                            rules: [
                            {
                                required: true,
                                message: '请输入输液袋标签的条码位数',
                            },
                            ],
                        })(<Input placeholder="请输入输液袋标签的条码位数" diabled style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item {...formItemLayout} label="用户被锁定前允许连续输错密码次数">
                        {getFieldDecorator('banned_login_failure', {
                            initialValue: banned_login_failure,
                            rules: [
                            {
                                required: true,
                                message: '请输入用户被锁定前允许连续输错密码次数',
                            },
                            ],
                        })(<Input placeholder="请输入用户被锁定前允许连续输错密码次数" type='number' min='1' style={{ width: 200 }}/>)}
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 6, offset: 10 }} style={{marginTop: 20}}>
                        <Button type="primary" htmlType="submit">
                            确定
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    }
}

export const SystemTable = Form.create({ name: 'IndexTable' })(IndexTable);