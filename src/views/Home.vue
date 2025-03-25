<!--
 * @file Home.vue
 * @description 网站首页组件
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-25
 -->

<template>
  <div class="home-page">
    <!-- 轮播图 -->
    <TheBanner />

    <!-- 其他内容 -->
    <div class="container">

      <!-- 产品分类部分 -->
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">产品服务</h2>
          <div class="categories-grid">
            <div v-for="category in productCategories" :key="category.id" class="category-card">
              <i :class="category.icon"></i>
              <h3>{{ category.name }}</h3>
              <p>{{ category.description }}</p>
              <span class="count">{{ category.count }}个产品</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 最新产品部分 -->
      <section class="products-section">
        <div class="container">
          <h2 class="section-title">最新产品</h2>
          <div class="products-grid">
            <div v-for="product in latestProducts" :key="product.id" class="product-card">
              <img :src="product.image" :alt="product.name">
              <div class="product-info">
                <span class="category">{{ product.category }}</span>
                <h3>{{ product.name }}</h3>
                <p>{{ product.description }}</p>
                <span class="date">{{ product.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 新闻动态部分 -->
      <section class="news-section">
        <div class="container">
          <h2 class="section-title">新闻动态</h2>
          <div class="news-grid">
            <div v-for="news in latestNews" :key="news.id" class="news-card">
              <img :src="news.image" :alt="news.title">
              <div class="news-info">
                <span class="category">{{ news.category }}</span>
                <h3>{{ news.title }}</h3>
                <p>{{ news.summary }}</p>
                <span class="date">{{ news.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 客户评价部分 -->
      <section class="testimonials-section">
        <div class="container">
          <h2 class="section-title">客户评价</h2>
          <div class="testimonials-grid">
            <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
              <img :src="testimonial.avatar" :alt="testimonial.name" class="avatar">
              <p class="content">{{ testimonial.content }}</p>
              <div class="author">
                <h4>{{ testimonial.name }}</h4>
                <span>{{ testimonial.position }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { productCategories, latestProducts, latestNews, testimonials } from '@/data/homeData'
import TheBanner from '@/components/TheBanner.vue'
import { useHead } from '@vueuse/head'

useHead({
  title: '首页',
  meta: [
    {
      name: 'description',
      content: '欢迎访问我们的网站。这里有最新的产品信息、行业动态和客户评价。'
    },
    {
      property: 'og:title',
      content: '首页 | 您的网站名称'
    },
    {
      property: 'og:description',
      content: '欢迎访问我们的网站。这里有最新的产品信息、行业动态和客户评价。'
    },
    {
      name: 'keywords',
      content: '产品展示,新闻动态,客户评价,服务介绍'
    }
  ]
})
</script>

<style scoped>
.home-page {
  min-height: 100vh;
}

/* 轮播图样式 */
.carousel-section {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  height: 100%;
}

.carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  z-index: 1;
}

.carousel-content h2 {
  font-size: 2.5em;
  margin-bottom: 20px;
}

.btn-primary {
  display: inline-block;
  padding: 12px 30px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
}

.btn-primary:hover {
  background: #764ba2;
}

/* 通用容器样式 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.section-title {
  text-align: center;
  font-size: 2em;
  margin-bottom: 40px;
  color: #333;
}

/* 产品分类样式 */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.category-card {
  text-align: center;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-card i {
  font-size: 2.5em;
  color: #667eea;
  margin-bottom: 20px;
}

/* 产品卡片样式 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.product-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.category {
  display: inline-block;
  padding: 4px 12px;
  background: #e9ecef;
  border-radius: 15px;
  font-size: 0.9em;
  color: #667eea;
}

/* 新闻卡片样式 */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.news-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.news-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.news-info {
  padding: 20px;
}

/* 客户评价样式 */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.testimonial-card {
  text-align: center;
  padding: 30px;
  background: #f8f9fa;
  border-radius: 10px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.author {
  margin-top: 20px;
}

.date {
  color: #6c757d;
  font-size: 0.9em;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .carousel-section {
    height: 300px;
  }

  .carousel-content h2 {
    font-size: 1.8em;
  }

  .section-title {
    font-size: 1.5em;
  }
}
</style>