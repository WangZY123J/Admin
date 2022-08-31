import request from '@/utils/request'

/**
 * 获取累计收益明细
 */
export const getChartTrend = () => {
  return request({
    url: '/chart/trend',
    method: 'GET'
  })
}

/**
 * 日历图示数据
 */
export const getChartCalendar = () => {
  return request({
    url: '/chart/calendar',
    method: 'GET'
  })
}

/**
 * 指定日期的时段柱形数据
 * @param {*} date 日期
 * @returns
 */
export const getChartTimeAmount = (date) => {
  return request({
    url: '/chart/time/amount',
    method: 'GET',
    params: {
      date
    }
  })
}

/**
 * 获取饼图数据
 */
export const getChartPie = () => {
  return request({
    url: '/chart/pie',
    method: 'GET'
  })
}

/**
 * 获取词云数据
 */
export const getChartWordCloud = () => {
  return request({
    url: '/chart/wordcloud'
  })
}

/**
 * 地图可视化
 */
export const getChartMap = () => {
  return request({
    url: '/chart/bmap',
    method: 'GET'
  })
}

/**
 * 大区数据
 */
 export const getChartRegions = () => {
  return request({
    url: '/chart/regions',
    method: 'GET'
  })
}

/**
 * 表格数据
 */
 export const getChartSheet = regionId => {
  return request({
    url: '/chart/sheets',
    method: 'GET',
    params: {
      regionId
    }
  })
}

