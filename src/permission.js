import router from './router'
import store from './store'

//白名单，所有未登录之前(没有token)能进入的界面的路径
const whiteList = ['/login']

/**
 * 前置路由守卫
 * @param {*} to 去哪
 * @param {*} from 从哪来
 *  @param {*} next 接下来去哪,next()往下一步走
 */
router.beforeEach(async (to, from, next) => {
  //存在token，进入主页，不允许进入登录界面
  if (store.getters.token) {
    //存在token，禁止进入登录界面，跳转主页面
    if (to.path === '/login') {
      next('/')
    } else {
      //不存在用户信息，则需要获取信息
      //刷新页面vuex里的数据消失，重新获取用户信息
      if (!store.getters.hasUserInfo) {
        // 触发获取用户信息的 action，并获取用户当前权限
        const { permission } = await store.dispatch('user/getUserInfo')
        // 处理用户权限，筛选出需要添加的路由权限
        const filterRoutes = await store.dispatch(
          'permission/filterRoutes',
          permission.menus
        )
        // 利用 addRoute 循环添加
        filterRoutes.forEach((item) => {
          router.addRoute(item)
        })
        // 添加完动态路由之后，需要在进行一次主动跳转
        return next(to.path)
      }
      next()
    }
  } else {
    //没有token，去白名单里的界面，放行
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login') //去别的界面不让去，只能去登录界面
    }
  }
})
