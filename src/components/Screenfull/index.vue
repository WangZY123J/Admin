<template>
  <div @click="onToggle" id="guide-full">
    <svg-icon  :icon="isFullScreen ? 'exit-fullscreen' : 'fullscreen'"/>
  </div>
</template>

<script setup>
import {ref,onMounted,onUnmounted} from 'vue'
import screenfull from 'screenfull'

//触发事件
const onToggle = ()=>{
  screenfull.toggle()
}

//变换图标
//是否全屏
const isFullScreen = ref(false)

//监听变化
const change = ()=>{
  isFullScreen.value = screenfull.isFullscreen
}

onMounted(()=>{
  screenfull.on('change',change)
})

onUnmounted(()=>{
  screenfull.off('change',change)
})


</script>

<style lang="scss" scoped></style>