<!--
 * @file Contact.vue
 * @description 联系我们页面组件
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-25
 -->

<template>
  <div class="contact-page">
    <div class="container">
      <!-- 页面标题 -->
      <div class="page-header">
        <h1>联系我们</h1>
        <p>随时为您提供专业的技术支持和服务</p>
      </div>

      <div class="contact-content">
        <!-- 左侧联系信息 -->
        <div class="contact-info">
          <div class="info-card">
            <i class="fas fa-map-marker-alt"></i>
            <h3>公司地址</h3>
            <p>安徽省合肥市经济技术开发区5F创客空间</p>
            <p>邮编：230000</p>
          </div>

          <div class="info-card">
            <i class="fas fa-phone"></i>
            <h3>联系电话</h3>
            <p>销售热线：18156992100</p>
            <p>技术支持QQ：769313759</p>
          </div>

          <div class="info-card">
            <i class="fas fa-envelope"></i>
            <h3>电子邮箱</h3>
            <p>商务合作：xiaweifeng@live.cn</p>
            <p>技术支持：tommyifeng@gmail.com</p>
          </div>

          <div class="info-card">
            <i class="fas fa-clock"></i>
            <h3>工作时间</h3>
            <p>周一至周五：9:00 - 18:00</p>
            <p>周六至周日：休息</p>
          </div>
        </div>

        <!-- 右侧联系表单 -->
        <div class="contact-form">
          <h2>在线留言</h2>
          <form @submit.prevent="submitForm">
            <div class="form-group">
              <label for="name">姓名</label>
              <input 
                type="text" 
                id="name" 
                v-model="form.name" 
                required
                placeholder="请输入您的姓名"
              >
            </div>

            <div class="form-group">
              <label for="email">邮箱</label>
              <input 
                type="email" 
                id="email" 
                v-model="form.email" 
                required
                placeholder="请输入您的邮箱"
              >
            </div>

            <div class="form-group">
              <label for="phone">电话</label>
              <input 
                type="tel" 
                id="phone" 
                v-model="form.phone" 
                required
                placeholder="请输入您的联系电话"
              >
            </div>

            <div class="form-group">
              <label for="subject">主题</label>
              <select id="subject" v-model="form.subject" required>
                <option value="">请选择主题</option>
                <option value="business">商务合作</option>
                <option value="support">技术支持</option>
                <option value="feedback">意见反馈</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">留言内容</label>
              <textarea 
                id="message" 
                v-model="form.message" 
                required
                rows="5"
                placeholder="请输入您的留言内容"
              ></textarea>
            </div>

            <button type="submit" class="submit-btn">
              提交留言
              <i class="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>

      <!-- 地图部分 -->
      <div class="map-section">
        <h2>公司位置</h2>
        <div class="map-container">
          <div id="amap-container"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { onMounted, ref } from 'vue'

// 公司地址信息
const companyAddress = ref('安徽省合肥市经济技术开发区5F创客空间')
const companyPosition = ref([117.206482, 31.776565]) // 经纬度坐标，请根据实际位置调整

// 初始化地图
const initMap = () => {
  // 确保AMap已加载
  if (window.AMap) {
    // 创建地图实例
    const map = new window.AMap.Map('amap-container', {
      zoom: 15,
      center: companyPosition.value,
    })

    // 添加标记点
    const marker = new window.AMap.Marker({
      position: companyPosition.value,
      title: companyAddress.value,
    })
    map.add(marker)

    // 添加信息窗体
    const infoWindow = new window.AMap.InfoWindow({
      content: `<div class="info-window">
                  <h3>公司地址</h3>
                  <p>${companyAddress.value}</p>
                </div>`,
      offset: new window.AMap.Pixel(0, -30)
    })

    // 点击标记时打开信息窗体
    marker.on('click', () => {
      infoWindow.open(map, marker.getPosition())
    })

    // 默认打开信息窗体
    infoWindow.open(map, marker.getPosition())
  }
}

// 加载高德地图API
const loadAMapScript = () => {
  if (window.AMap) {
    initMap()
    return
  }

  const script = document.createElement('script')
  script.src = 'https://webapi.amap.com/maps?v=2.0&key=88f8067596e552e821541f3ff0b550aa&plugin=AMap.InfoWindow'
  script.async = true
  script.onload = initMap
  document.head.appendChild(script)
}

onMounted(() => {
  loadAMapScript()
})

useHead({
  title: '联系我们',
  meta: [
    {
      name: 'description',
      content: '欢迎联系我们，获取更多产品信息和服务支持。我们提供多种联系方式，随时为您提供专业的咨询服务。'
    },
    {
      property: 'og:title',
      content: '联系我们 | 您的网站名称'
    },
    {
      property: 'og:description',
      content: '欢迎联系我们，获取更多产品信息和服务支持。我们提供多种联系方式，随时为您提供专业的咨询服务。'
    },
    {
      name: 'keywords',
      content: '联系方式,在线咨询,地址电话,客户服务,技术支持'
    }
  ]
})
</script>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // 这里添加表单提交逻辑
      console.log('表单数据：', this.form)
      // 提交成功后清空表单
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
      alert('感谢您的留言，我们会尽快回复！')
    }
  }
}
</script>

<style scoped>
.contact-page {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 40px;
  margin-bottom: 40px;
}

/* 联系信息卡片样式 */
.contact-info {
  display: grid;
  gap: 20px;
}

.info-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  text-align: center;
}

.info-card i {
  font-size: 2em;
  color: #667eea;
  margin-bottom: 15px;
}

.info-card h3 {
  color: #2d3748;
  margin-bottom: 10px;
}

.info-card p {
  color: #718096;
  margin: 5px 0;
}

/* 联系表单样式 */
.contact-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.contact-form h2 {
  color: #2d3748;
  margin-bottom: 30px;
  font-size: 1.5em;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #4a5568;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1em;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
}

.submit-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #764ba2;
}

/* 地图部分样式 */
.map-section {
  margin-top: 40px;
}

.map-section h2 {
  color: #2d3748;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.map-container {
  height: 400px;
  background: #f8f9fa;
  border-radius: 10px;
  overflow: hidden;
}

#amap-container {
  width: 100%;
  height: 100%;
}

.info-window {
  padding: 10px;
  max-width: 200px;
}

.info-window h3 {
  margin: 0 0 5px 0;
  color: #2d3748;
  font-size: 16px;
}

.info-window p {
  margin: 0;
  color: #718096;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .page-header h1 {
    font-size: 2em;
  }

  .contact-form {
    padding: 20px;
  }

  .map-container {
    height: 300px;
  }
}
</style>