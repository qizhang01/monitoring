import React from 'react';
import {Input,InputNumber,Icon,Select,DatePicker} from 'antd';
import moment from 'moment';
import ReactQuill from 'react-quill';


let debounce = require('lodash.debounce');


export const LabelItem=({name,label,labelStyle={color:'#ccc',paddingRight:10,display:'flex',alignItems:'center'},children})=>{
    return label?<div style={{display:'flex',margin:8}}>
        <div style={labelStyle}>
            {name}
        </div>
        <div style={{flexGrow:1,display:'flex',alignItems:'center'}}>
            {children}
        </div>
    </div>: <span>{children}</span>
}

export class InputLabel extends React.Component {
    constructor(props){
        super(props);
        this.state={
            edit:false,
            text:this.props.text
        }
    }
    submit=(e)=>{
        let {value}=e.target;
        let {name,onSubmit}=this.props;
        this.setState({
            text:value,
            edit:false
        })
        onSubmit && onSubmit(name,value);
    }
    dateChange(m,s){
        let {name,onSubmit}=this.props;
        this.setState({
            text:s,
            edit:false
        })
        onSubmit && onSubmit(name,s);
    }

    quillBlur=()=>{
        let value=this.refs.reactQuill.getEditorContents();
        let {name,onSubmit}=this.props;
        this.setState({
            text:value,
            edit:false
        })
        onSubmit && onSubmit(name,value);
    }

    value=()=>{
        if(this.props.render){
            return this.props.render(this.state.text);
        }
        return this.state.text
    }

    componentWillReceiveProps(props){
        this.setState({
            text:props.text
        })
    }

    renderWrapper=(item)=>{
        let {name,label,inputType,wrapper,inline,...rest}=this.props;
        if(inline){
            return <LabelItem label={label} name={label+':'}>{item}<Icon style={{marginLeft:10,color:'#39f'}} type='edit' onClick={()=>{this.setState({edit:true})}}></Icon></LabelItem>
        }
        return <div>
            <div style={{marginTop:10,marginBottom:10}}>{label+':'}<Icon style={{marginLeft:10,color:'#39f'}} type='edit' onClick={()=>{this.setState({edit:true})}}></Icon></div>
            <div>{item}</div>
        </div>
    }
    render() {
        let {name,label,inputType,wrapper,placeholder,data=[],...rest}=this.props;
        let {text}=this.state;
        let {edit}=this.state;
        let item=null;
        placeholder=placeholder||'请输入'+label;
        if(edit || !text){
            if(inputType=='number'){
                item=<InputNumber {...rest} defaultValue={text} onBlur={this.submit} onPressEnter={this.submit} placeholder={placeholder}></InputNumber>
            }else if(inputType=='date'){
                item=<DatePicker defaultValue={text?moment(text):''}  placeholder={placeholder} onChange={(m,s)=>{this.dateChange(m,s)}}  {...rest}/>
            }else if(inputType=='quill'){
                item=<ReactQuill ref='reactQuill' onBlur={this.quillBlur} defaultValue={text} style={{height:200}}  placeholder={placeholder}/>
            }else if(inputType=='select'){
                item=<Select>
                    {data.map(item=><Option value={item.value}>{item.name}</Option>)}
                </Select>
            }else{
                item=<Input {...rest} defaultValue={text} onBlur={this.submit} onPressEnter={this.submit}  placeholder={placeholder}></Input>
            }
            if(wrapper){
                return this.renderWrapper(item)
            }else{
                return item;
            }
        }else{
            if(inputType=='quill'){
                return <div className="my-inputlabel" dangerouslySetInnerHTML={{__html: text}} title="点击此处可以编辑" onClick={()=>{this.setState({edit:true})}}></div>
            }
            item=<label className="my-inputlabel" title="点击此处可以编辑" onClick={()=>{this.setState({edit:true})}}>{this.value()||'点击此处编辑'}</label>;
            if(wrapper){
                return this.renderWrapper(item)
            }else{
                return item;
            }
        }
    }
}

export function isEmpty(value){
    if(Number.isFinite(value)){
        return false;
    }else{
        return !value;
    }
}
