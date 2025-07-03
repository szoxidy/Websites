<template>
  <div id="contain">
    <div class="row">
      <div class="box" v-for="bm in firstHalf" :key="bm.name">
        <a :href="bm.href" target="_blank"></a>
        <div class="icon-sweep-light">
          <img class="icon" :src="bm.icon" :alt="bm.name" :id="bm.id"/>
        </div>
        <p class="url" :title="bm.title">{{ bm.name }}</p>
      </div>
    </div>
    <div class="row">
      <div class="box" v-for="bm in secondHalf" :key="bm.name">
        <a :href="bm.href" target="_blank"></a>
        <div class="icon-sweep-light">
          <img class="icon" :src="bm.icon" :alt="bm.name"/>
        </div>
        <p class="url" :title="bm.title">{{ bm.name }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed} from 'vue'

interface Bookmark {
  id?: string;
  title?: string;
  name: string;
  href: string;
  icon: string
}

const bookmarks: Bookmark[] = [
  {
    name: 'Google',
    href: 'https://www.google.com/',
    icon: './images/Google.png'
  },
  {
    name: 'ChatGPT',
    href: 'https://chat.openai.com/',
    icon: './images/ChatGPT.png'
  },
  {
    name: '哔哩哔哩',
    href: 'https://www.bilibili.com/',
    icon: './images/BiliBili.png'
  },
  {
    name: '超星学习通',
    href: 'https://i.chaoxing.com/',
    icon: './images/LeaningPass.png'
  },
  {
    name: '翻译',
    href: 'https://translate.google.com',
    icon: './images/Translate.png'
  },
  {
    name: '布谷',
    href: 'https://www.bugutv.vip/',
    icon: './images/CuckooTV.png'
  },
  {
    name: '维基百科',
    href: 'https://zh.wikipedia.org/',
    icon: './images/Wikipedia.png'
  },
  {
    id: 'github',
    name: 'Github',
    href: 'https://github.com/',
    icon: './github.svg'
  },
  {
    name: '京东',
    href: 'https://www.jd.com/',
    icon: './images/Jingdong.png'
  },
  {
    name: '乐回享',
    href: 'https://8lhx.com/',
    icon: './images/HappyEcho.png'
  },
  {
    name: 'XDA',
    href: 'https://forum.xda-developers.com/mi-5',
    icon: './images/XDA.png'
  },
  {
    title: 'Tencent Cloud',
    name: 'Tencent Cloud',
    href: 'https://cloud.tencent.com/',
    icon: './images/TencentCloudLogo.png'
  },
  {
    name: 'Google Mail',
    href: 'https://mail.google.com/',
    icon: './images/Gmail.png'
  },
  {
    name: 'Youtube',
    href: 'https://m.youtube.com/',
    icon: './images/YouTube.png'
  },
  {
    title: 'Tutorial Kart',
    name: 'Tutorial Kart',
    href: 'https://www.tutorialkart.com/',
    icon: './images/Tutorial kart.png'
  },
  {
    name: 'LanZou',
    href: 'https://pc.woozooo.com/',
    icon: './images/LanZou.png'
  },
  {
    name: 'MIUI',
    href: 'https://www.miui.com/',
    icon: './images/XiaoMi.png'
  },
  {
    name: '酷安',
    href: 'https://www.coolapk.com/',
    icon: './images/coolapk.png'
  },
  {
    name: '菜鸟教程',
    href: 'https://www.runoob.com/',
    icon: './images/runoob.png'
  },
  {
    title: 'Android 社区',
    name: 'Android 社区',
    href: 'https://www.androidos.net.cn/',
    icon: './images/Android.png'
  },
  {
    name: 'W3schools',
    href: 'https://www.w3school.com.cn/',
    icon: './images/W3School.png'
  },
  {
    name: '知乎',
    href: 'https://www.zhihu.com/',
    icon: './images/KnowAlmost.png'
  },
  {
    title: 'Stack Overflow',
    name: 'Stack Overflow',
    href: 'https://stackoverflow.com/',
    icon: './images/StackOverflow.png'
  },
  {
    name: 'Vue',
    href: 'https://cn.vuejs.org/',
    icon: './images/Vue.png'
  }
];

const half = Math.ceil(bookmarks.length / 2)
const firstHalf = computed(() => bookmarks.slice(0, half))
const secondHalf = computed(() => bookmarks.slice(half))
</script>

<style lang="scss" scoped>
#contain {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 25px 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.box {
  width: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
