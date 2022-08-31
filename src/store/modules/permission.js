import { privateRoutes, publicRoutes } from '@/router'

export default {
  namespaced: true,
  state: () => ({
    //初始拥有静态路由权限
    routes: publicRoutes
  }),

  mutations: {
    setRoutes(state, value) {
      //永远在静态路由基础上添加新路由
      state.routes = [...publicRoutes, ...value]
    }
  },

  actions: {
    //根据权限筛选路由
    //menu 权限对象
    filterRoutes(context, menus) {
      const routes = []
      // 路由权限匹配
      menus.forEach((key) => {
        // 权限名 与 路由的 name 匹配
        routes.push(...privateRoutes.filter((item) => item.name === key))
      })
      // 最后添加 不匹配路由进入 404
      routes.push({
        path: '/:catchAll(.*)',
        redirect: '/404'
      })
      context.commit('setRoutes', routes)
      return routes
    }
  }
}
