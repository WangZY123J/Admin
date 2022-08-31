<template>
  <div class="trend-chart-container" ref="target"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'
import * as ECharts from 'echarts'
import { useI18n } from 'vue-i18n/dist/vue-i18n.cjs'
import { watchSwitchLang } from '@/utils/i18n.js';

const i18n = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const target = ref(null)
let mChart
onMounted(() => {
  mChart = ECharts.init(target.value)
  renderChart()
})

/**
 * 图表渲染方法
 */
const renderChart = () => {
  const options = {
    // 鼠标移入之后的提示框配置
    tooltip: {
      trigger: 'axis', // 鼠标移入到坐标轴时，触发提示框
      // 移入坐标轴时，提示框的配置项
      axisPointer: {
        type: 'cross', // 显示十字准星指示器
        // 指示器样式
        crossStyle: {
          color: '#999' // 色值
        }
      }
    },

    // 图例配置
    legend: {
      data: [i18n.t('msg.chart.monthIncome'),i18n.t('msg.chart.dayIncome')], // 图例数据
      right: 0 // 图例位置
    },

    // ECharts 网格绘制的位置，对应 上、右、下、左
    grid: {
      top: 20,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true // 计算边距时，包含标签
    },

    // X 轴配置
    xAxis: {
      type: 'category', // 坐标轴类型，category：类目轴
      data: props.data.monthAmountList.map((item) => item.time), // 坐标轴数据
      // 刻度尺配置
      axisTick: {
        show: false // 不显示坐标轴刻度
      }
    },

    // y 轴配置
    yAxis: {
      type: 'value', // Y 轴类型，value：数值轴
      min: 0, // 最小值
      // 最大值, value -->传进来的数据列表
      max: function (value) {
        // 取整
        return parseInt(value.max * 1.2)
      },
      // 刻度上展示的文字
      axisLabel: {
        formatter: `{value} ${i18n.t('msg.chart.unit')}`
      }
    },

    // 图表类型
    series: [
      // 第一个图表
      {
        name: i18n.t('msg.chart.monthIncome'), // 图表名字，对应 legend.data[0]
        type: 'bar', // 图表类型
        barWidth: 20, // 柱的宽度
        // 提示框展示配置
        tooltip: {
          // 提示框展示的内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        },
        data: props.data.monthAmountList.map((item) => item.amount) // 数据源
      },
      // 第二个图表
      {
        name: i18n.t('msg.chart.dayIncome'), // 图表名字，对应 legend.data[1]
        type: 'line', // 图表类型
        color: '#6EC6D0', // 颜色
        smooth: true, // 平滑
        // 提示框展示配置
        tooltip: {
          // 提示框展示的内容
          valueFormatter: function (value) {
            return value + i18n.t('msg.chart.unit')
          }
        },
        data: props.data.dailyCurve.map((item) => item.amount) // 数据源
      }
    ]
  }

  mChart.setOption(options)
}

watchSwitchLang(renderChart)

</script>

<style lang="scss" scoped>
.trend-chart-container {
  height: 100%;
}
</style>
