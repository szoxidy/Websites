<template>
  <span id="workBoard">
    <span id="currentTime"> {{ time }} </span>
  </span>

</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import moment from 'moment-timezone'

const time = ref('')
let timer: number

function update() {
  // 使用 moment-timezone 获取台北时间
  time.value = moment().tz('Asia/Shanghai').format('YYYY 年 MM 月 DD 日 HH : mm : ss')
}

onMounted(() => {
  update()
  timer = window.setInterval(update, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>
<style scoped>
#workBoard {
  /* 基础容器样式 */
  display: inline-block;
  padding: 12px 20px;
}

#currentTime {
  /* 时间显示样式 */
  color: #2c3e50;
  font-weight: 500;
}


</style>