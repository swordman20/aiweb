<!--
 * @file NewsDetail.vue
 * @description 新闻详情页面组件
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-25
 -->

<template>
  <div class="news-detail-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <i class="fas fa-chevron-right"></i>
        <router-link to="/news">新闻动态</router-link>
        <i class="fas fa-chevron-right"></i>
        <span>{{ currentNews?.title }}</span>
      </div>

      <!-- 新闻内容 -->
      <article class="news-content" v-if="currentNews">
        <header class="news-header">
          <h1>{{ currentNews.title }}</h1>
          <div class="news-meta">
            <span class="category">{{ currentNews.category }}</span>
            <span class="date">{{ currentNews.date }}</span>
          </div>
        </header>

        <div class="news-image">
          <img :src="currentNews.image" :alt="currentNews.title">
        </div>

        <div class="news-body">
          <p v-for="(paragraph, index) in currentNews.content.split('\n\n')" 
             :key="index" 
             class="paragraph">
            {{ paragraph }}
          </p>
        </div>

        <!-- 分享按钮 -->
        <div class="share-section">
          <h3>分享到：</h3>
          <div class="share-buttons">
            <a href="#" class="share-btn weixin">
              <i class="fab fa-weixin"></i>
            </a>
            <a href="#" class="share-btn weibo">
              <i class="fab fa-weibo"></i>
            </a>
            <a href="#" class="share-btn qq">
              <i class="fab fa-qq"></i>
            </a>
          </div>
        </div>
      </article>

      <!-- 相关新闻 -->
      <section class="related-news" v-if="relatedNews.length">
        <h2>相关新闻</h2>
        <div class="related-grid">
          <div v-for="related in relatedNews" 
               :key="related.id" 
               class="related-card"
               @click="goToNews(related.id)">
            <img :src="related.image" :alt="related.title">
            <div class="related-info">
              <h3>{{ related.title }}</h3>
              <span class="date">{{ related.date }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { newsList } from '@/data/newsData'

const route = useRoute()
const router = useRouter()

const currentNews = ref(null)
const relatedNews = ref([])

// 获取新闻详情
const loadNews = () => {
  const newsId = parseInt(route.params.id)
  currentNews.value = newsList.find(news => news.id === newsId)
  
  // 获取相关新闻（同分类的其他新闻）
  if (currentNews.value) {
    relatedNews.value = newsList
      .filter(item => 
        item.category === currentNews.value.category && 
        item.id !== currentNews.value.id
      )
      .slice(0, 3)
  }
}

// 跳转到其他新闻
const goToNews = (newsId) => {
  router.push(`/news/${newsId}`)
}

// 监听路由变化，重新加载新闻信息
onMounted(() => {
  loadNews()
})

// SEO 配置
useHead({
  title: computed(() => currentNews.value?.title || '新闻详情'),
  meta: [
    {
      name: 'description',
      content: computed(() => currentNews.value?.summary || '')
    },
    {
      property: 'og:title',
      content: computed(() => `${currentNews.value?.title || '新闻详情'} | 您的网站名称`)
    },
    {
      property: 'og:description',
      content: computed(() => currentNews.value?.summary || '')
    },
    {
      name: 'keywords',
      content: computed(() => `${currentNews.value?.title || ''},${currentNews.value?.category || ''},新闻动态,企业新闻`)
    }
  ]
})
</script>

<style scoped>
.news-detail-page {
  padding: 40px 0;
}

/* 面包屑导航 */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
  color: #718096;
}

.breadcrumb a {
  color: #667eea;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #764ba2;
}

.breadcrumb i {
  font-size: 0.8em;
}

/* 新闻内容 */
.news-content {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  margin-bottom: 40px;
}

.news-header {
  text-align: center;
  margin-bottom: 30px;
}

.news-header h1 {
  font-size: 2em;
  color: #2d3748;
  margin-bottom: 15px;
}

.news-meta {
  display: flex;
  justify-content: center;
  gap: 20px;
  color: #718096;
  font-size: 0.9em;
}

.category {
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 15px;
  color: #667eea;
}

.news-image {
  margin: 30px 0;
  border-radius: 10px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: auto;
  display: block;
}

.news-body {
  line-height: 1.8;
  color: #4a5568;
}

.paragraph {
  margin-bottom: 20px;
}

/* 分享按钮 */
.share-section {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e2e8f0;
}

.share-section h3 {
  color: #2d3748;
  margin-bottom: 15px;
}

.share-buttons {
  display: flex;
  gap: 15px;
}

.share-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2em;
  transition: transform 0.3s ease;
}

.share-btn:hover {
  transform: translateY(-3px);
}

.weixin {
  background: #07c160;
}

.weibo {
  background: #e6162d;
}

.qq {
  background: #12b7f5;
}

/* 相关新闻 */
.related-news {
  margin-top: 40px;
}

.related-news h2 {
  color: #2d3748;
  margin-bottom: 30px;
  font-size: 1.5em;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.related-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.related-card:hover {
  transform: translateY(-5px);
}

.related-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.related-info {
  padding: 15px;
}

.related-info h3 {
  color: #2d3748;
  margin-bottom: 10px;
  font-size: 1.1em;
}

.related-info .date {
  color: #718096;
  font-size: 0.9em;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .news-content {
    padding: 20px;
  }

  .news-header h1 {
    font-size: 1.5em;
  }

  .news-meta {
    flex-direction: column;
    gap: 10px;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }
}
</style> 