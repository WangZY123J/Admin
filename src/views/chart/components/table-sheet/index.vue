<template>
  <el-row :gutter="20">
    <el-col :span="18">
      <s2Vue :data="sheetData" />
    </el-col>
    <el-col :span="6">
      <sheetLabelVue
        v-for="(item, index) in regionsData"
        :data="item"
        :isSelected="currentRegionsIndex === index"
        :key="item.id"
        class="mb-25"
        @click="onChangeRegion(index)"
      />
    </el-col>
  </el-row>
</template>

<script setup>
import s2Vue from './components/s2.vue'
import sheetLabelVue from './components/sheet-label.vue'
import { getChartRegions } from '@/api/chart'
import { ref } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import { getChartSheet } from '@/api/chart'


/**
 * 获取大区数据
 */
const regionsData = ref([])
const currentRegionsIndex = ref(0)
const getChartRegionsData = async () => {
  const { regions } = await getChartRegions()
  regionsData.value = regions
  // 获取第一个大区(默认)对应的数据
  getChartSheetData(regionsData.value[0].id)
}
getChartRegionsData()

/**
 * 切换大区
 */
const onChangeRegion = (index) => {
  currentRegionsIndex.value = index
  // 获取对应大区对应的数据
  getChartSheetData(regionsData.value[index].id)
}

/**
 * 大区对应的表格数据
 */
const sheetData = ref([])
const getChartSheetData = async id => {
  const res = await getChartSheet(id)
  sheetData.value = res
}
getChartSheetData()

// 切换语言，数据重新获取
watchSwitchLang(getChartRegionsData)
</script>

<style lang="scss" scoped>
.mb-25 {
  margin-bottom: 25px;
}
</style>
