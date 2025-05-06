<template>
  <div class="product-detail-page">
    <div class="container">
      <!-- 面包屑导航 -->
      <div class="breadcrumb">
        <router-link to="/">首页</router-link>
        <i class="fas fa-chevron-right"></i>
        <router-link to="/products">商品列表</router-link>
        <i class="fas fa-chevron-right"></i>
        <span>{{ currentProduct?.name }}</span>
      </div>

      <!-- 商品详情 -->
      <div class="product-content" v-if="currentProduct">
        <div class="product-gallery">
          <img :src="currentProduct.image" :alt="currentProduct.name">
        </div>

        <div class="product-info">
          <h1 class="product-title">{{ currentProduct.name }}</h1>
          <div class="product-meta">
            <span class="category">{{ currentProduct.category }}</span>
            <span class="price">¥{{ currentProduct.price }}</span>
          </div>
          <p class="description">{{ currentProduct.description }}</p>
          
          <!-- 产品特点 -->
          <div class="features">
            <h2>产品特点</h2>
            <ul>
              <li v-for="(feature, index) in currentProduct.features" :key="index">
                <i class="fas fa-check"></i>
                {{ feature }}
              </li>
            </ul>
          </div>

          <!-- 规格参数 -->
          <div class="specifications">
            <h2>规格参数</h2>
            <table>
              <tr v-for="(value, key) in currentProduct.specifications" :key="key">
                <td class="spec-name">{{ key }}</td>
                <td class="spec-value">{{ value }}</td>
              </tr>
            </table>
          </div>

          <!-- 咨询按钮 -->
          <div class="actions">
            <router-link to="/contact" class="contact-btn">
              <i class="fas fa-envelope"></i>
              产品咨询
            </router-link>
          </div>
        </div>
      </div>

      <!-- 相关推荐 -->
      <section class="related-products" v-if="relatedProducts.length">
        <h2>相关推荐</h2>
        <div class="related-grid">
          <div 
            v-for="related in relatedProducts" 
            :key="related.id"
            class="related-card"
            @click="goToProduct(related.id)"
          >
            <img :src="related.image" :alt="related.name">
            <div class="related-info">
              <h3>{{ related.name }}</h3>
              <span class="price">¥{{ related.price }}</span>
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
import { productList } from '@/data/productData'

const route = useRoute()
const router = useRouter()

const currentProduct = ref(null)
const relatedProducts = ref([])

// 获取当前商品信息
const loadProduct = () => {
  const productId = parseInt(route.params.id)
  currentProduct.value = productList.find(product => product.id === productId)
  
  // 获取相关商品（同类别的其他商品）
  if (currentProduct.value) {
    relatedProducts.value = productList
      .filter(item => 
        item.category === currentProduct.value.category && 
        item.id !== currentProduct.value.id
      )
      .slice(0, 3)
  }
}

// 跳转到其他商品详情
const goToProduct = (productId) => {
  router.push(`/product/${productId}`)
}

// 监听路由变化，重新加载商品信息
onMounted(() => {
  loadProduct()
})

// SEO 配置
useHead({
  title: computed(() => currentProduct.value?.name || '商品详情'),
  meta: [
    {
      name: 'description',
      content: computed(() => currentProduct.value?.description || '')
    },
    {
      property: 'og:title',
      content: computed(() => `${currentProduct.value?.name || '商品详情'} | 您的网站名称`)
    },
    {
      property: 'og:description',
      content: computed(() => currentProduct.value?.description || '')
    },
    {
      name: 'keywords',
      content: computed(() => `${currentProduct.value?.name || ''},${currentProduct.value?.category || ''},产品详情,技术参数,产品特点`)
    }
  ]
})
</script>

<style scoped>
.product-detail-page {
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

/* 商品内容 */
.product-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.product-gallery {
  border-radius: 10px;
  position: relative;
  width: 100%;
  padding-top: 75%; /* 4:3 比例 */
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.product-gallery img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-info {
  padding: 20px;
}

.product-title {
  font-size: 2em;
  color: #2d3748;
  margin-bottom: 15px;
}

.product-meta {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.category {
  background: #e9ecef;
  padding: 4px 12px;
  border-radius: 15px;
  color: #667eea;
  font-size: 0.9em;
}

.price {
  font-size: 1.5em;
  color: #e53e3e;
  font-weight: bold;
}

.description {
  color: #4a5568;
  line-height: 1.6;
  margin-bottom: 30px;
}

/* 产品特点 */
.features {
  margin-bottom: 30px;
}

.features h2 {
  font-size: 1.2em;
  color: #2d3748;
  margin-bottom: 15px;
}

.features ul {
  list-style: none;
  padding: 0;
}

.features li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #4a5568;
}

.features i {
  color: #48bb78;
}

/* 规格参数 */
.specifications {
  margin-bottom: 30px;
}

.specifications h2 {
  font-size: 1.2em;
  color: #2d3748;
  margin-bottom: 15px;
}

.specifications table {
  width: 100%;
  border-collapse: collapse;
}

.specifications td {
  padding: 12px;
  border-bottom: 1px solid #e2e8f0;
}

.spec-name {
  color: #718096;
  width: 30%;
}

.spec-value {
  color: #2d3748;
}

/* 咨询按钮 */
.actions {
  margin-top: 30px;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-btn:hover {
  background: #764ba2;
  transform: translateY(-2px);
}

/* 相关推荐 */
.related-products {
  margin-top: 60px;
}

.related-products h2 {
  font-size: 1.5em;
  color: #2d3748;
  margin-bottom: 30px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.related-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .product-content {
    grid-template-columns: 1fr;
  }

  .product-title {
    font-size: 1.5em;
  }

  .related-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}
</style>
  