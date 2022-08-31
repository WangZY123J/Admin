<template>
  <div>
    <div class="logo-container">
      <el-avatar
        :size="50"
        shape="square"
        src="https://tse1-mm.cn.bing.net/th/id/OIP-C.n7Bkny9ghK5CJzE3YQPAxwAAAA?w=180&h=180&c=7&r=0&o=5&pid=1.7"
      />

      <h1 class="logo-title" v-if="$store.getters.sidebarOpened">Yang JiaYi</h1>
    </div>

    <el-divider  />
    
    <el-scrollbar>
      <SidebarMenu></SidebarMenu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import {} from 'vue'
import SidebarMenu from './SidebarMenu.vue'
</script>

<style lang="scss" scoped>
.logo-container {
  height: 44px;
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 25px;
    font-style: italic;
    font-weight: 300;
    font-family: 'Times New Roman', Times, serif;
    white-space: nowrap;
  }
}
</style>
