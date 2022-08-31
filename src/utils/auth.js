import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant/index'
import { setItem, getItem } from '@/utils/storage'

//设置时间戳
export const setTimeStamp = () => {
  return setItem(TIME_STAMP, Date.now())
}

//获取时间戳
export const getTimeStamp = () => {
  return getItem(TIME_STAMP)
}

//判断是否超时
export const isCheckTimeout = () => {
  //当前时间戳
  const currentTime = Date.now()
  //缓存时候的时间戳
  const storageTimeStamp = getTimeStamp()
  return currentTime - storageTimeStamp > TOKEN_TIMEOUT_VALUE
}
