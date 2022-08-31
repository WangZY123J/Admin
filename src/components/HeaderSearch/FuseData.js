import path from 'path-browserify'
import i18n from '@/i18n'

//把路由数据弄成符合 fuse 格式的列表，作为第一个参数传入
export const generateRoutes = (routes, basePath = '/', prefixTitle = []) => {
  let result = []
  //循环所有路由
  for (const route of routes) {
    const data = {
      path: path.resolve(basePath, route.path),
      title: [...prefixTitle]
    }

    //存在 meta 时，使用 i18n 解析国际化数据，组合成新的 title 内容
    //动态路由不予许被搜索
    //匹配动态路由的正则
    const r = /.*\/:.*/
    if (route.meta && route.meta.title && !r.exec(route.path)) {
      const i18nTitle = i18n.global.t(`msg.route.${route.meta.title}`)
      data.title = [...data.title, i18nTitle]
      result.push(data)
    }

    //存在 children 时，迭代调用
    if (route.children) {
      const tempRoutes = generateRoutes(route.children, data.path, data.title)
      if (tempRoutes.length >= 1) {
        result = [...result, ...tempRoutes]
      }
    }
  }

  return result
}
