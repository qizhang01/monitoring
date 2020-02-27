import React from 'react';
import {Modal,message} from 'antd'
import util from 'src/common/util'
import EmptyImage from 'src/common/images/u3365.png';



export function showConfirm(callback=function(){},messageText) {
  Modal.confirm({
    title: '提示',
    content: messageText||'是否确认要删除？',
    cancelText:"否",
    okText:"是的",
    onOk() {
      callback()
    },
    onCancel() {},
  });
}


export function isSuccess(res){
    if(res.code=="success" && typeof res.data !=='string'){
        success()
        return true;
    }else{
        error();
        return false;
    }
}

export function error(){
    message.error('操作失败');
}


export function success(text='操作成功'){
    message.success(text);
}

export function valid(data,expreesion){
    let result=util.isValid(data,expreesion);
    if(!result.flag){
        message.warn(result.name+result.message.join(',并且'));
    }
    return result.flag
}


export function Empty({message='当前没有数据',style={},size='30%',children}){
    return <div className="empty-image" style={style}>
                <img style={{ width:size}} src={EmptyImage} alt=""/>
                <div className='empty-descr'>
                    <div className='empty-message'>{message}</div>
                    {children}
                </div>
            </div>
}
