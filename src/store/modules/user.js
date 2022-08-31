import { login, getUserInfo } from '@/api/sys'
import md5 from 'md5'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN } from '@/constant/index'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,

  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: {}
  }),

  mutations: {
    setToken(state, value) {
      state.token = value
      setItem(TOKEN, value)
    },

    setUserInfo(state, value) {
      state.userInfo = value
    }
  },

  actions: {
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password: md5(password)
        })
          .then((data) => {
            context.commit('setToken', data.token)
            router.push('/')
            //保存登录时间
            setTimeStamp()
            resolve()
          })
          .catch((err) => {
            reject(err)
          })
      })
    },

    async getUserInfo(context) {
      const result = await getUserInfo()
      context.commit('setUserInfo', result)
      return result
    },

    logout(context) {
      resetRouter()
      context.commit('setToken', '')
      context.commit('setUserInfo', {})
      removeAllItem()
      router.push('/login')
    }
  }
}
