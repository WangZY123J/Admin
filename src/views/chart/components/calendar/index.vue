<template>
  <el-card
    class="container"
    :body-style="{
      padding: 0
    }"
  >
    <el-calendar class="calendar" v-model="currentDate">
      <template #dateCell="{ data }">
        <p
          :class="[
            data.isSelected ? 'is-selected' : '',
            calendarItemBgClass(data.day)
          ]"
        >
          <!-- 显示的内容 -->
          {{ data.day.split('-').slice(2).join('') }}
          <br />
          <span class="amount" v-if="getTodayAmount(data.day)">{{
            getTodayAmount(data.day)
          }}</span>
        </p>
      </template>
    </el-calendar>
  </el-card>
</template>

<script setup>
import { ref ,watch} from 'vue'
import { getChartCalendar } from '@/api/chart'
import emitter from '@/utils/eventHub'

// 选中的日期
const currentDate = ref(new Date())

//获取日历数据
const calendarListData = ref([])
const getCalendarListData = async () => {
  const { result } = await getChartCalendar()
  calendarListData.value = result
}
getCalendarListData()

//收益缓存数据， key 为日期， val 为对应的金额
const dateAmountList = ref({})
/**
 * 返回指定日期收益数据，在日历中显示
 */
const getTodayAmount = (date) => {
  //读取缓存数据
  if (dateAmountList.value[date]) {
    return dateAmountList.value[date]
  }
  //获取当日数据
  const todayData = calendarListData.value.find((item) => item.date === date)
  if (!todayData) return 0
  //获取当日收益
  const todayAmount = todayData.amount
  //缓存数据
  dateAmountList.value[date] = todayAmount
  return todayAmount
}

/**
 * 日历背景
 */
const calendarItemBgClass = (day) => {
  if (getTodayAmount(day) > 0) {
    return 'profile'
  } else if (getTodayAmount(day) < 0) {
    return 'loss'
  } else {
    return ''
  }
}

/**
 * 触发日期改变的事件
 */
watch(currentDate,val=>{
  emitter.emit('calendarChange',val)
})


</script>

<style lang="scss" scoped>
.container {
  height: 443px;
  .calendar {
    ::v-deep .el-calendar__body {
      padding: 0 12px 12px;
      font-size: 14px;
    }
    ::v-deep .el-calendar-day {
      height: 66px !important;
      padding: 0 !important;
      p {
        height: 100%;
        padding: 8px;
      }
      // 金额样式
      .amount {
        font-size: 12px;
      }
      // 正收益
      .profit {
        background-color: #f3fff3;
        span {
          color: #649840;
        }
      }
      // 负收益
      .loss {
        background-color: #ffe7e7;
        span {
          color: #b65d59;
        }
      }

      .is-selected {
        background-color: #d6f2ff;
      }
    }
  }
}
</style>
