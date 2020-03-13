/**
 * Created by zhq on 2019/7/18.
 * 请求方法
 */

import { Modal, message } from "antd";

const ipConfig = {
    dev: {
      host: "http://localhost:7777/api",
    },
    pro: {
       host: "http://122.51.100.203/api",
    }
}    

const APICodeToPath = {
    'employee':'/employee',  //根据ID查医院工作人员姓名
    'password':'/password', //修改密码
    'logout': '/logout'  //登录退出
}
const env = process.env.NODE_ENV=="development" ?'dev': 'pro'
const hostE = ipConfig[env].host

const getAPIRequestUrl = (APICode) => {
    const path = APICodeToPath[APICode];
    // if(process.env.NODE_ENV=="development"){
    //     return `${hostE}${path}`;
    // }else{
    //     return `${window.apiUrl}/api${path}`
    // }
    if(window.apiUrl){
        return `${window.apiUrl}/api${path}`
    }else{
        return `/api${path}`
    }
};
export async function fetchAPI(
    APICode = "",              // 接口编号
    params = "",               // 请求数据
    method="GET",              //请求方式
    formData = {},
    getMode = '?',
    shouldLoading = true,      // 是否显示loading（非必传,默认为true
) {
    const url = params? getAPIRequestUrl(APICode) + getMode + params : getAPIRequestUrl(APICode);

    if (shouldLoading) {
        message.loading("加载中...", 3000);
    }
    try {
        let response
        if(method!=="GET"){
            let config = {
                method,
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    API_KEY: 'vs^k*DM|3LO@!PdCz|Ufz|+gu-SOxD',
                }
            }; 
            if(APICode!=="login") config.headers['X-Access-Token'] = window.loginInfo.token
            response = await fetch(url, config).then(response=>response.json())
                .catch(e => {
                  throw e;
                })
            if( response && response.message){
                message.destroy()
                message.warning(response.message);
                return;
            }   
        }else{
            const config = {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                    API_KEY: 'vs^k*DM|3LO@!PdCz|Ufz|+gu-SOxD',
                    "X-Access-Token": ""
                }
            };
            response = await fetch(url,config).then(response=>response.json())
                .catch(e => {
                    throw e;
                })
            if(response&&response.message){
                message.destroy()
                message.warning(response.message);
                return;
            }    
        }
        message.destroy()
        return response;
    } catch (e) {
        message.destroy()
        message.warning(e.message);
        return ;
    }
}

