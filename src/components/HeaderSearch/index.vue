<template>
  <div :class="{ show: isShow }" class="header-search">
    <div id="guide-search" @click.stop="onShowClick" class="svg-container">
      <svg-icon   class-name="search-icon" icon="search" />
    </div>

    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :placeholder="$t('msg.guide.searchTitle')"
      :remote-method="querySearch"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { filterRouters } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

// 控制 search 显示
const isShow = ref(false)
// el-select 实例
const headerSearchSelectRef = ref(null)
const onShowClick = () => {
  isShow.value = !isShow.value
  headerSearchSelectRef.value.focus()
}

// 搜索相关
const search = ref('')
let searchOptions = ref([])
// 在输入值发生变化时调用，参数为当前输入值
const querySearch = (query) => {
  // console.log(fuse.search(query))
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}

// 选中值发生变化时跳转
//value--> 对应的 fuse 信息，{path:...,title:[...]}
const onSelectChange = (value) => {
  // console.log(value)
  router.push(value.path)
}

const router = useRouter()
//检索数据源,弄成符合 fuse 检索的格式
let searchPool = computed(() => {
  return generateRoutes(filterRouters(router.getRoutes()))
})

//搜索库相关,第一个参数为列表
let fuse
const initFuse = (list) => {
  fuse = new Fuse(list, {
    shouldSort: true, //是否按优先级进行排序
    minMatchCharLength: 1, //匹配长度超过这个值才被认为是匹配的
    keys: [
      //将被搜索的键列表，name:搜索的键 weight:权重
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool.value)

//关闭搜索
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

watch(isShow, () => {
  if (isShow) {
    document.addEventListener('click', onClose)
  } else {
    document.removeEventListener('click', onClose)
  }
})

//处理国际化
watchSwitchLang(() => {
  searchPool = computed(() => {
    return generateRoutes(filterRouters(router.getRoutes()))
  })
  initFuse(searchPool.value)
})
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .svg-container {
    display: inline-block;

    ::v-deep .search-icon {
      cursor: pointer;
      font-size: 18px;
      vertical-align: middle;
    }
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
