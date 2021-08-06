import axios from "axios"
import {showLoading, hideLoading} from './loading.js'

// 调用axios.create方法，配置一些属性，返回一个新的axios
const request= axios.create({
    baseURL: "http://localhost:8181/",
    //请求超时时间
    timeout: 5000
})

// 请求拦截
request.interceptors.request.use(
	//config 代表是你请求的一些信息
    config => {
        //showLoading();
        // 在请求发送之前的操作
        return config
    },
    error => {
        //hideLoading();
        return Promise.reject(error)
    }
)

//  response拦截器 响应拦截器 请求之后的操作
request.interceptors.response.use(
    config => {
      //hideLoading();
        return config
    },
    error => {
      //hideLoading();
        return Promise.reject(error)
    }
)

export default request;