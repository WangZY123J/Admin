import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
//导入全局样式表(重置样式)
import './styles/index.scss'
//导入 svgIcon
import installIcons from '@/icons'
//导入前置路由守卫
import '@/permission'
//导入国际化
import i18n from '@/i18n/index'
//全局属性
import installFilter from '@/filters'
//打印指令
import installDirective from '@/directives'

const app = createApp(App)
installElementPlus(app)
installIcons(app)
installFilter(app)
installDirective(app)
app.use(store).use(router).use(i18n).mount('#app')
