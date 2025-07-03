<template>
  <form @submit.prevent="search" class="search_bar">
    <label for="search_submit"></label>
    <input type="submit" id="search_submit" @submit.prevent="search" value="Start">

    <span>
      <label for="search_input"></label>
      <input class="search" id="search_input" maxlength="2048" type="text" autocomplete="off" autofocus
             spellcheck="false"
             placeholder="请输入内容或网址" value="">
    </span>
  </form>
</template>

<script lang="ts" setup>
import {search} from '@/composables/useSearch'
</script>
<style lang="scss" scoped>
</style>
