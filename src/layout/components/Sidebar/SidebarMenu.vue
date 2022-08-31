<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :collapse="!$store.getters.sidebarOpened"
    :default-active="activeMenu"
    :background-color="$store.getters.cssVar.menuBg"
    :text-color="$store.getters.cssVar.menuText"
    :active-text-color="$store.getters.cssVar.menuActiveText"
    :unique-opened="true"
    router
  >
    <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue'
import { filterRouters, generateMenus } from '@/utils/route'
import { useRoute, useRouter } from 'vue-router'
import SidebarItem from './SidebarItem.vue'

const router = useRouter()
const routes = computed(() => {
  return generateMenus(filterRouters(router.getRoutes()))
})
//当前点开的路由
const route = useRoute()
//刷新后默认打开的路由（刷新前所在路由）
const activeMenu = computed(() => {
  const { path } = route
  return path
})


</script>

<style lang="scss" scoped></style>
