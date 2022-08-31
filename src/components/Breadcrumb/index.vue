<template>
  <el-breadcrumb class="breadcrumb" separator=">>">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项（最后一项）     -->
        <span
          v-if="index === breadcrumbData.length - 1"
          class="no-redirect"
          :style="'color:' + $store.getters.cssVar.menuBg"
          >{{ generateTitle(item.meta.title) }}</span
        >
        <!-- 可点击项（除了最后一项） -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()
//生成数组数据
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  //route.matched 获取与给定路由地址匹配的标准化的路由记录数组，记录上的每一个路由都放进数组，[ 父级路由，子级路由 ]
  breadcrumbData.value = route.matched.filter((item) => {
    return item.meta && item.meta.title
  })
}

//监听路由变化时触发
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  { immediate: true }
)

//点击跳转路由
const router = useRouter()
const onLinkClick = () => {
  router.push(item.path)
}

//主题切换，获取动态样式
const store = useStore()
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .redirect {
    color: #666;
    font-weight: 600;
  }

  .no-redirect {
    //随主题切换颜色
    color: v-bind(linkHoverColor);
  }
}
</style>
