<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <div @click="onClick" id="guide-start">
        <svg-icon icon="guide" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { useI18n } from 'vue-i18n/dist/vue-i18n.cjs'
import steps from './steps.js'
import { watchSwitchLang } from '@/utils/i18n.js'

const i18n = useI18n()
let driver = null

onMounted(() => {
  initDriver()
})

const initDriver = () => {
  driver = new Driver({
    opacity: 0.1,
    animate: false, //设置false，没有动画，opacity失效
    allowClose: false, //禁止点击蒙版关闭
    closeBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev')
  })
}

watchSwitchLang(initDriver)

const onClick = () => {
  driver.defineSteps(steps(i18n))
  driver.start()
}
</script>

<style lang="scss" scoped></style>
