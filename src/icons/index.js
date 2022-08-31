// https://webpack.docschina.org/guides/dependency-management/#requirecontext

import SvgIcon from '@/components/SvgIcon'

//（创建出）一个 context，其中文件来自 svg 目录，request 以 `.svg` 结尾
const svgRequire = require.context('./svg', false, /\.svg$/)
//导入本地 svg 图标
svgRequire.keys().forEach((svgIcon) => svgRequire(svgIcon))

//完成 SvgIcon 的全局注册
//好多组件用，直接整 app 上
export default (app) => {
  app.component('SvgIcon', SvgIcon)
}
