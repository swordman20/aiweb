<!--
 * @file ProductList.vue
 * @description 商品列表页面组件
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-25
 -->

<template>
  <div class="product-list-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <i class="fas fa-chevron-right"></i>
        <span>产品中心</span>
      </div>

      <!-- 产品筛选 -->
      <div class="filter-section">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="搜索产品..."
            @input="handleSearch"
          >
          <i class="fas fa-search"></i>
        </div>

        <div class="category-filter">
          <button 
            v-for="category in categories" 
            :key="category"
            :class="['category-btn', { active: currentCategory === category }]"
            @click="filterByCategory(category)"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <!-- 产品列表 -->
      <div class="products-grid">
        <div 
          v-for="product in filteredProducts" 
          :key="product.id" 
          class="product-card"
          @click="goToProduct(product.id)"
        >
          <div class="product-image">
            <img :src="product.image" :alt="product.name">
          </div>
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="description">{{ product.description }}</p>
            <div class="product-meta">
              <span class="category">{{ product.category }}</span>
              <span class="price">¥{{ product.price }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 分页 -->
      <div class="pagination" v-if="totalPages > 1">
        <button 
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <span>{{ currentPage }} / {{ totalPages }}</span>
        <button 
          :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHead } from '@vueuse/head'
import { productList } from '@/data/productData'

const router = useRouter()

// 响应式状态
const searchQuery = ref('')
const currentCategory = ref('全部')
const currentPage = ref(1)
const itemsPerPage = 12

// 分类列表
const categories = computed(() => {
  const uniqueCategories = new Set(productList.map(product => product.category))
  return ['全部', ...Array.from(uniqueCategories)]
})

// 过滤产品
const filteredProducts = computed(() => {
  let filtered = productList

  // 搜索过滤
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query)
    )
  }

  // 分类过滤
  if (currentCategory.value !== '全部') {
    filtered = filtered.filter(product => 
      product.category === currentCategory.value
    )
  }

  // 分页
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

// 计算总页数
const totalPages = computed(() => 
  Math.ceil(filteredProducts.value.length / itemsPerPage)
)

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1
}

// 分类过滤
const filterByCategory = (category) => {
  currentCategory.value = category
  currentPage.value = 1
}

// 切换页面
const changePage = (page) => {
  currentPage.value = page
}

// 跳转到产品详情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

// SEO 配置
useHead({
  title: '产品中心',
  meta: [
    {
      name: 'description',
      content: '我们提供全系列优质产品，包括最新产品、热门产品等。专业的产品质量和完善的售后服务，为您提供最佳的采购选择。'
    },
    {
      property: 'og:title',
      content: '产品中心 | 您的网站名称'
    },
    {
      property: 'og:description',
      content: '我们提供全系列优质产品，包括最新产品、热门产品等。专业的产品质量和完善的售后服务，为您提供最佳的采购选择。'
    },
    {
      name: 'keywords',
      content: '产品中心,产品列表,产品展示,产品目录,产品分类,在线选购'
    }
  ]
})
</script>

<style scoped>
.product-list-page {
  padding: 40px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
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

/* 筛选部分 */
.filter-section {
  margin-bottom: 30px;
}

.search-box {
  position: relative;
  margin-bottom: 20px;
}

.search-box input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
}

.search-box i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #718096;
}

.category-filter {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.category-btn.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

/* 产品网格 */
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin: 0 0 10px;
  color: #2d3748;
  font-size: 1.2em;
}

.description {
  color: #718096;
  font-size: 0.9em;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category {
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 15px;
  color: #667eea;
  font-size: 0.9em;
}

.price {
  color: #e53e3e;
  font-weight: bold;
}

/* 分页 */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.pagination button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  border-color: #667eea;
  color: #667eea;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }

  .product-image {
    height: 160px;
  }

  .product-info {
    padding: 15px;
  }

  .product-info h3 {
    font-size: 1.1em;
  }
}
</style>
  