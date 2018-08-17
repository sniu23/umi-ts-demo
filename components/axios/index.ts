import axios from "axios";
import { notification } from "antd";
// import Cookies from 'js-cookie';

const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 15000,
})

service.interceptors.request.use(config => {
  // config.headers.Authorization = 'Bearer ' + Cookies.get('http://127.0.0.1:3001/')
  // console.log(`axios\s plugins request : ${JSON.stringify(config)}`)
  return config
}, error => {
  notification.warning({
    message: '请求失败：',
    description: (error.name + ' $ ' + error.message) || '未知原因！',
    duration: 0,
  })
  // return Promise.reject(error)
})

service.interceptors.response.use(
  response => {
    const respData = response.data
    if (!respData.success) {
      notification.warning({
        message: '后台操作异常：',
        description: respData.message || '未知异常！',
        duration: 0,
      })
    }
    return response.data
  },
  error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      // redirect('/system/login')
    } else {
      notification.error({
        message: '服务器发生错误：',
        description: (error.response && error.response.data && error.response.data.message) || (error.name + ' $ ' + error.message) || '未知错误！',
        duration: 0,
      })
    }
    // return Promise.reject(error)
  }
)

export default service