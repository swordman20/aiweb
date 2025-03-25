<!--
 * @file NewsList.vue
 * @description 新闻列表页面组件
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-25
 -->

<template>
  <div class="news-list-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1>新闻动态</h1>
        <p>了解公司最新动态和行业资讯</p>
      </div>

      <div class="news-content">
        <!-- 左侧新闻列表 -->
        <div class="news-main">
          <div class="news-grid">
            <div v-for="news in filteredNews" :key="news.id" class="news-card">
              <div class="news-image">
                <img :src="news.image" :alt="news.title">
              </div>
              <div class="news-info">
                <div class="news-meta">
                  <span class="category">{{ news.category }}</span>
                  <span class="date">{{ news.date }}</span>
                </div>
                <h2 class="news-title">{{ news.title }}</h2>
                <p class="news-summary">{{ news.summary }}</p>
                <router-link :to="'/news/' + news.id" class="read-more">
                  阅读更多 <i class="fas fa-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="pagination">
            <button 
              :disabled="currentPage === 1" 
              @click="currentPage--"
              class="page-btn"
            >
              <i class="fas fa-chevron-left"></i>
            </button>
            <span class="page-info">第 {{ currentPage }} 页</span>
            <button 
              :disabled="currentPage === totalPages" 
              @click="currentPage++"
              class="page-btn"
            >
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>

        <!-- 右侧边栏 -->
        <div class="news-sidebar">
          <!-- 新闻分类 -->
          <div class="sidebar-section">
            <h3>新闻分类</h3>
            <ul class="category-list">
              <li 
                v-for="category in newsCategories" 
                :key="category.id"
                :class="{ active: selectedCategory === category.name }"
                @click="selectedCategory = category.name"
              >
                {{ category.name }}
              </li>
            </ul>
          </div>

          <!-- 热门新闻 -->
          <div class="sidebar-section">
            <h3>热门新闻</h3>
            <ul class="hot-news-list">
              <li v-for="news in hotNews" :key="news.id">
                <router-link :to="'/news/' + news.id">
                  {{ news.title }}
                </router-link>
                <span class="date">{{ news.date }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { newsList, newsCategories } from '@/data/newsData'
import { useHead } from '@vueuse/head'

export default {
  name: 'NewsListPage',
  data() {
    return {
      newsList,
      newsCategories,
      selectedCategory: '全部',
      currentPage: 1,
      itemsPerPage: 6
    }
  },
  computed: {
    filteredNews() {
      let filtered = this.newsList
      if (this.selectedCategory !== '全部') {
        filtered = filtered.filter(news => news.category === this.selectedCategory)
      }
      return filtered
    },
    totalPages() {
      return Math.ceil(this.filteredNews.length / this.itemsPerPage)
    },
    hotNews() {
      return this.newsList.slice(0, 5)
    }
  },
  setup() {
    useHead({
      title: '新闻中心',
      meta: [
        {
          name: 'description',
          content: '了解我们的最新动态、行业资讯、技术分享以及企业新闻。及时获取行业最新信息和发展趋势。'
        },
        {
          property: 'og:title',
          content: '新闻中心 | 您的网站名称'
        },
        {
          property: 'og:description',
          content: '了解我们的最新动态、行业资讯、技术分享以及企业新闻。及时获取行业最新信息和发展趋势。'
        },
        {
          name: 'keywords',
          content: '新闻动态,行业资讯,技术分享,企业新闻,最新公告'
        }
      ]
    })
  }
}
</script>

<style scoped>
.news-list-page {
  padding: 40px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5em;
  color: #2d3748;
  margin-bottom: 10px;
}

.page-header p {
  color: #718096;
  font-size: 1.1em;
}

.news-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
}

/* 新闻卡片样式 */
.news-grid {
  display: grid;
  gap: 30px;
}

.news-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-image {
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover .news-image img {
  transform: scale(1.05);
}

.news-info {
  padding: 20px;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 0.9em;
  color: #718096;
}

.category {
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 15px;
  color: #667eea;
}

.news-title {
  font-size: 1.3em;
  color: #2d3748;
  margin-bottom: 10px;
}

.news-summary {
  color: #718096;
  margin-bottom: 15px;
  line-height: 1.6;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.read-more:hover {
  color: #764ba2;
}

/* 分页样式 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
}

.page-btn {
  background: white;
  border: 1px solid #e2e8f0;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #718096;
}

/* 侧边栏样式 */
.sidebar-section {
  background: white;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.sidebar-section h3 {
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 1.2em;
}

.category-list {
  list-style: none;
}

.category-list li {
  padding: 10px 0;
  cursor: pointer;
  color: #718096;
  transition: color 0.3s ease;
}

.category-list li:hover,
.category-list li.active {
  color: #667eea;
}

.hot-news-list {
  list-style: none;
}

.hot-news-list li {
  padding: 10px 0;
  border-bottom: 1px solid #e2e8f0;
}

.hot-news-list li:last-child {
  border-bottom: none;
}

.hot-news-list a {
  color: #2d3748;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
  transition: color 0.3s ease;
}

.hot-news-list a:hover {
  color: #667eea;
}

.hot-news-list .date {
  font-size: 0.9em;
  color: #718096;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .news-content {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2em;
  }

  .news-image {
    height: 150px;
  }
}
</style> 