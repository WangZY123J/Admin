const whiteList = ['/login','/import','/401','/404']


//是标签的返回 true ，白名单里的返回 false
export const isTags = (path)=>{
  return !whiteList.includes(path)
}