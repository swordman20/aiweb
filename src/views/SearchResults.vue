<!--
 * @file SearchResults.vue
 * @description 搜索结果页面组件
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-25
 -->

<template>
  <div class="search-results-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <i class="fas fa-chevron-right"></i>
        <span>搜索结果</span>
      </div>

      <!-- 搜索框 -->
      <div class="search-header">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索商品或新闻..." 
            @keyup.enter="handleSearch"
          >
          <button @click="handleSearch">
            <i class="fas fa-search"></i>
          </button>
        </div>
        <p class="search-info">找到 {{ totalResults }} 个相关结果</p>
      </div>

      <!-- 搜索结果标签页 -->
      <div class="search-tabs">
        <button 
          :class="{ active: activeTab === 'products' }" 
          @click="activeTab = 'products'"
        >
          商品 ({{ productResults.length }})
        </button>
        <button 
          :class="{ active: activeTab === 'news' }" 
          @click="activeTab = 'news'"
        >
          新闻 ({{ newsResults.length }})
        </button>
      </div>

      <!-- 商品搜索结果 -->
      <div v-if="activeTab === 'products'" class="product-results">
        <div v-if="productResults.length" class="product-grid">
          <div 
            v-for="product in productResults" 
            :key="product.id"
            class="product-card"
            @click="goToProduct(product.id)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name">
              <div class="product-overlay">
                <span class="price">¥{{ product.price }}</span>
              </div>
            </div>
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="description">{{ product.description }}</p>
              <div class="features">
                <span 
                  v-for="(feature, index) in product.features.slice(0, 3)" 
                  :key="index"
                  class="feature-tag"
                >
                  {{ feature }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="no-results">
          <i class="fas fa-box-open"></i>
          <p>未找到相关商品</p>
        </div>
      </div>

      <!-- 新闻搜索结果 -->
      <div v-if="activeTab === 'news'" class="news-results">
        <div v-if="newsResults.length" class="news-grid">
          <div v-for="news in newsResults" :key="news.id" class="news-card">
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
        <div v-else class="no-results">
          <i class="fas fa-newspaper"></i>
          <p>未找到相关新闻</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useHead } from '@vueuse/head'
import { computed } from 'vue'
import { productList } from '@/data/productData'
import { newsList } from '@/data/newsData'

const route = useRoute()
const searchQuery = computed(() => route.query.q || '')

useHead({
  title: computed(() => `搜索：${searchQuery.value}`),
  meta: [
    {
      name: 'description',
      content: computed(() => `搜索"${searchQuery.value}"的结果，包含相关产品、新闻和服务信息。`)
    },
    {
      property: 'og:title',
      content: computed(() => `搜索：${searchQuery.value} | 您的网站名称`)
    },
    {
      property: 'og:description',
      content: computed(() => `搜索"${searchQuery.value}"的结果，包含相关产品、新闻和服务信息。`)
    },
    {
      name: 'robots',
      content: 'noindex,follow'  // 搜索结果页面通常不需要被搜索引擎索引
    }
  ]
})

const activeTab = ref('products')
const productResults = ref([])
const newsResults = ref([])

const totalResults = computed(() => productResults.value.length + newsResults.value.length)

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    search(searchQuery.value.trim())
  }
}

const search = (query) => {
  // 搜索商品
  productResults.value = productList.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  )

  // 搜索新闻
  newsResults.value = newsList.filter(news => 
    news.title.toLowerCase().includes(query.toLowerCase()) ||
    news.summary.toLowerCase().includes(query.toLowerCase())
  )
}

const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

// 从路由参数获取搜索关键词
const query = route.query.q
if (query) {
  searchQuery.value = query
  search(query)
}
</script>

<style scoped>
.search-results-page {
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

/* 搜索头部 */
.search-header {
  text-align: center;
  margin-bottom: 40px;
}

.search-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.search-box input {
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 30px;
  width: 400px;
  font-size: 16px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  width: 450px;
}

.search-box button {
  background: none;
  border: none;
  color: #2d3748;
  cursor: pointer;
  padding: 12px;
  margin-left: 10px;
  transition: color 0.3s ease;
}

.search-box button:hover {
  color: #667eea;
}

.search-info {
  color: #718096;
  font-size: 14px;
}

/* 标签页 */
.search-tabs {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.search-tabs button {
  padding: 10px 20px;
  border: none;
  background: none;
  color: #718096;
  cursor: pointer;
  font-size: 16px;
  position: relative;
  transition: color 0.3s ease;
}

.search-tabs button.active {
  color: #667eea;
}

.search-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #667eea;
}

/* 商品网格 */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 15px;
  background: linear-gradient(transparent, rgba(0,0,0,0.7));
  color: white;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin-bottom: 10px;
  color: #2d3748;
}

.description {
  color: #718096;
  margin-bottom: 15px;
  font-size: 14px;
}

.features {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.feature-tag {
  background: #edf2f7;
  color: #4a5568;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 12px;
}

/* 新闻网格 */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.news-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.news-image {
  height: 200px;
  overflow: hidden;
}

.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-info {
  padding: 20px;
}

.news-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #718096;
}

.news-title {
  margin-bottom: 10px;
  color: #2d3748;
}

.news-summary {
  color: #718096;
  margin-bottom: 15px;
  font-size: 14px;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.read-more:hover {
  color: #764ba2;
}

/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 60px 0;
  color: #718096;
}

.no-results i {
  font-size: 48px;
  margin-bottom: 20px;
  color: #cbd5e0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .search-box input {
    width: 100%;
    max-width: 300px;
  }

  .search-box input:focus {
    width: 100%;
    max-width: 300px;
  }

  .product-grid,
  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style> 