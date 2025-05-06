<template>
  <div id="app">
    <TheNavbar />
    <main class="main-content">
      <router-view></router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: '官网',
  titleTemplate: '%s | 安徽飞沃信息科技有限公司',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: '基础软件服务，物联网应用服务，专业平台软件开发。' },
    { property: 'og:title', content: '安徽飞沃科技' },
    { property: 'og:description', content: '基础软件服务，物联网应用服务，专业平台软件开发。' },
    { property: 'og:type', content: 'website' },
    { name: 'robots', content: 'index,follow' }
  ]
})
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  margin-top: 70px; /* 为固定导航栏留出空间 */
}

/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-content {
    margin-top: 60px;
  }
}
</style>
