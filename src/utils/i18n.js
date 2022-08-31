import i18n from '@/i18n'
import { watch } from 'vue'
import store from '@/store'

export const generateTitle = (title) => {
  return i18n.global.t('msg.route.' + title)
}


//语言变化时，把所有函数扔进去重新计算
//callbacks.forEach((callback) => callback(store.getters.language))
export const watchSwitchLang = (...callbacks) => {
  watch(
    () => store.getters.language,
    () => {
      callbacks.forEach((callback) => callback())
    }
  )
}
