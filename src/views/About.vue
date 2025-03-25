<!--
 * @file About.vue
 * @description 关于我们页面组件
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-25
 -->

<template>
    <div class="about-container">
      <!-- 页面标题部分 -->
      <div class="hero-section">
        <h1>关于我们</h1>
        <p class="subtitle">创新科技，引领未来</p>
      </div>
  
      <!-- 公司简介部分 -->
      <section class="company-intro">
        <div class="container">
          <h2>公司简介</h2>
          <p>我们是一家致力于创新科技解决方案的领先企业。自成立以来，我们始终秉持"创新、品质、服务"的理念，为客户提供最优质的产品和服务。</p>
          <div class="features">
            <div class="feature-item">
              <i class="fas fa-rocket"></i>
              <h3>创新驱动</h3>
              <p>持续创新，引领行业发展</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-star"></i>
              <h3>品质保证</h3>
              <p>严格把控，追求卓越</p>
            </div>
            <div class="feature-item">
              <i class="fas fa-handshake"></i>
              <h3>优质服务</h3>
              <p>客户至上，用心服务</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 团队介绍部分 -->
      <section class="team-section">
        <div class="container">
          <h2>我们的团队</h2>
          <div class="team-grid">
            <div class="team-member">
              <img src="/images/head01.png" alt="团队成员1">
              <h3>张三</h3>
              <p>首席执行官</p>
            </div>
            <div class="team-member">
              <img src="/images/head01.png" alt="团队成员2">
              <h3>李四</h3>
              <p>技术总监</p>
            </div>
            <div class="team-member">
              <img src="/images/head01.png" alt="团队成员3">
              <h3>王五</h3>
              <p>产品经理</p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- 联系我们部分 -->
      <section class="contact-section">
        <div class="container">
          <h2>联系我们</h2>
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <p>地址：北京市朝阳区科技园区88号</p>
            </div>
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <p>电话：010-88888888</p>
            </div>
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <p>邮箱：contact@company.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { useHead } from '@vueuse/head'

  useHead({
    title: '关于我们',
    meta: [
      {
        name: 'description',
        content: '了解我们的公司历史、企业文化、团队介绍以及发展愿景。我们致力于为客户提供最优质的产品和服务。'
      },
      {
        property: 'og:title',
        content: '关于我们 | 您的网站名称'
      },
      {
        property: 'og:description',
        content: '了解我们的公司历史、企业文化、团队介绍以及发展愿景。我们致力于为客户提供最优质的产品和服务。'
      },
      {
        name: 'keywords',
        content: '公司简介,企业文化,团队介绍,发展历程,企业愿景'
      }
    ]
  })
  </script>
  
  <script>
  export default {
    name: 'AboutUs'
  }
  </script>
  
  <style scoped>
  .about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .hero-section {
    text-align: center;
    padding: 60px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 10px;
    margin-bottom: 40px;
  }
  
  .hero-section h1 {
    font-size: 2.5em;
    margin-bottom: 20px;
  }
  
  .subtitle {
    font-size: 1.2em;
    opacity: 0.9;
  }
  
  section {
    padding: 40px 0;
  }
  
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  h2 {
    text-align: center;
    margin-bottom: 30px;
    color: #333;
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
  .feature-item {
    text-align: center;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    transition: transform 0.3s ease;
  }
  
  .feature-item:hover {
    transform: translateY(-5px);
  }
  
  .feature-item i {
    font-size: 2em;
    color: #667eea;
    margin-bottom: 15px;
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 30px;
    margin-top: 30px;
  }
  
  .team-member {
    text-align: center;
  }
  
  .team-member img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 15px;
  }
  
  .contact-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 30px;
  }
  
  .contact-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }
  
  .contact-item i {
    font-size: 1.5em;
    color: #667eea;
  }
  
  @media (max-width: 768px) {
    .hero-section {
      padding: 40px 0;
    }
  
    .hero-section h1 {
      font-size: 2em;
    }
  
    .features, .team-grid, .contact-info {
      grid-template-columns: 1fr;
    }
  }
  </style>
  