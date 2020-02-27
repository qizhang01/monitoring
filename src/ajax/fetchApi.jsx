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
    '001': '/patient', //获取患者信息
    '002': '/prescription', //获取患者的药方
    '003': '/prescription/sync', //从HIS系统获取数据
    '004': '/seats',//得到没有入座的座位编号
    'setting': '/setting', //得到科室对照信息
    'login': '/login', //登录
    'queue': '/queue', //查询排队
    'requeue': '/requeue', //过号的患者重新加入排队
    'skipped': '/queue/skipped', //查询过号不到的患者
    'infusion': '/infusion',//登记
    'seats': '/seats',//读取所有座位
    'seat': '/seat', //读取单个座位
    'seatDisable':'/seat/disable',//停用一片座位
    'seatEnabled': '/seat/enabled', //启用一片座位 
    'seatRange':'/seat/range', //按片读取所有座位
    'addSeats':'/seat',//添加一片座位
    'overview':'/infusion/overview', //一览信息
    'workload': '/infusion/workload', //当日一览
    'users': '/users',  //护士医生信息
    'user': '/user',  //添加用户和更新用户
    'history':'/infusion/history',  //病人单次注射信息
    'report':'/infusion/statistics', //日趋势和月趋势
    'infusionseat':'/infusion/seat',
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
                    "X-Access-Token": window.loginInfo.token
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

