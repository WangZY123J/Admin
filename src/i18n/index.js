import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs.js'
import store from '@/store'
import enLocale from './lang/en'
import zhLocale from './lang/zh'

const messages = {
  en: {
    msg: {
      ...enLocale
    }
  },
  zh: {
    msg: {
      ...zhLocale
    }
  }
}

// const locale = 'en'
//刷新之后语言不变
const getLanguage = ()=>{
  return store && store.getters && store.getters.language
}


const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale:getLanguage(),
  messages
})

export default i18n
