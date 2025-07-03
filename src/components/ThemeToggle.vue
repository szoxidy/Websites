<template>
  <div class="switch-theme" @click="toggleNeon">
    <Sun v-if="isNeon" style="height:  min(8vw, 42px);width: min(8vw, 42px);"/>
    <Moon v-else/>
  </div>
</template>

<script setup lang="ts">
import {applyTheme, hasManual, isNeon, prefersDark, toggleNeon} from '@/composables/useThemeSwitch'
import Sun from '@/assets/svg/sun.svg' // 直接当组件
import Moon from '@/assets/svg/moon.svg'
import {onMounted} from "vue";

/* ----------------------------------------------------------
 * 仅当用户「没手动选过」时，跟随系统明暗变化
 * ---------------------------------------------------------- */
onMounted(() => {
  if (!hasManual) {
    prefersDark.addEventListener('change', e => {
      // e.matches === true 表示系统切换到 dark
      applyTheme(!e.matches)
    })
  }
})

</script>

<style scoped lang="scss">
@use "../styles/theme.scss";
</style>
