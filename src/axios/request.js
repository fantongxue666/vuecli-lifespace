//request.js
import axios from "axios";

/****** 创建axios实例 ******/
const service = axios.create({
    baseURL: process.env.BASE_URL,  // api的base_url
    timeout: 5000  // 请求超时时间
});

/****** request拦截器==>对请求参数做处理 ******/
service.interceptors.request.use(config => {
    console.log(config.data)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
}, error => {  //请求错误处理
    Promise.reject(error)
});


/****** respone拦截器==>对响应做处理 ******/
service.interceptors.response.use(
    response => {  //成功请求到数据
        //这里根据后端提供的数据进行对应的处理
        if (response.data.result === 'TRUE') {
            return response.data;
        } else {
             //常规错误处理
             return response.data;
        }
    },
    error => {  //响应错误处理
        
        console.log(error);
        return Promise.reject(error)
    }
);
export default service;