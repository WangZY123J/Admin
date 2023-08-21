//定义全局属性文件夹
import dayjs from 'dayjs'
import rt from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import store from '@/store'

export const dateFilter = (value, format = 'YYYY-MM-DD') => {
  //如果是数字
  if (!isNaN(value)) {
    value = parseInt(value)
  }

  return dayjs(value).format(format)
}

//相对时间
dayjs.extend(rt)
const relativeTime = (value) => {
  //如果是数字
  if (!isNaN(value)) {
    value = parseInt(value)
  }
  return dayjs()
    .locale(store.getters.language === 'zh' ? 'zh-cn' : 'en')
    .to(dayjs(value))
}

export default (app) => {
  app.config.globalProperties.$filters = {
    dateFilter,
    relativeTime
  }
}
