import store from '@/store'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from './auth'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    // 获取用户信息需要对应的 token，对token进行统一注入
    if (store.getters.token) {
      if (isCheckTimeout()) {
        store.dispatch('user/logout')
        return Promise.reject(new Error('token 失效啦!'))
      }
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
    // 注入icode
    config.headers.icode = 'C58E22357D14C0A7'
    // 配置请求接口国际化
    config.headers['Accept-Language'] = store.getters.language
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { success, message, data } = response.data
    // 根据 success 是否成功决定下面操作
    if (success) {
      return data
    } else {
      // 业务错误(用户名输错...)
      ElMessage.error(message) // 提示错误信息
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 处理token超时问题
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === 401
    ) {
      // token超时
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message) // 提示错误信息
    return Promise.reject(error)
  }
)

export default service
