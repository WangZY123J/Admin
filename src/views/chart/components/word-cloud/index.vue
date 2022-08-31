<template>
  <el-card
    :body-style="{
      padding: 0
    }"
  >
    <div class="container" ref="target"></div>
  </el-card>
</template>

<script setup>
import * as ECharts from 'echarts'
import 'echarts-wordcloud'
import wordCloudBg from '@/assets/wordCloud.png'
import { ref, onMounted } from 'vue'
import { randomRGB } from '@/utils/color'
import { getChartWordCloud } from '@/api/chart.js'
import { useI18n } from 'vue-i18n/dist/vue-i18n.cjs'
import { watchSwitchLang } from '@/utils/i18n'

const i18n = useI18n()

/**
 * 获取数据
 */
const wordCloudData = ref([])
const getWordCloudData = async () => {
  const res = await getChartWordCloud()
  wordCloudData.value = res
  // 渲染图表
  renderChart()
}
getWordCloudData()

const target = ref(null)
let mChart = null
onMounted(() => {
  mChart = ECharts.init(target.value)
})

/**
 * 渲染图表
 */
const renderChart = () => {
  const maskImage = new Image()
  maskImage.src = wordCloudBg
  const option = {
    title: {
      text: ''
    },
    series: [
      {
        // 类型
        type: 'wordCloud',
        // 数据映射文本的大小范围
        sizeRange: [4, 80],
        // 文字旋转范围
        rotationRange: [0, 0],
        // 单词之间的间距
        gridSize: 0,
        // 绘制将排除图像的轮廓
        maskImage: maskImage,
        // 渲染动画
        layoutAnimation: true,
        // 字体
        textStyle: {
          // 随机色值
          color: randomRGB
        },
        // 高亮字体
        emphasis: {
          textStyle: {
            fontWeight: 'bold',
            color: '#000'
          }
        },
        // 数据
        data: wordCloudData.value
      }
    ]
  }

  maskImage.onload = function () {
    mChart.setOption(option)
  }
}

watchSwitchLang(getWordCloudData)
</script>

<style lang="scss" scoped>
.container {
  height: 240px;
}
</style>
