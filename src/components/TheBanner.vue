<!--
 * @file filename.vue
 * @description This file is part of the Vue3 + Vite + Vuetify project
 * @copyright Copyright (c) 2024 aidevelop.cn
 * @author aidevelop.cn
 * @email aidevelop@126.com
 * @date 2024-03-21
 -->
<template>
  <div class="banner">
    <div class="banner-container">
      <transition-group name="fade">
        <div 
          v-for="banner in banners" 
          :key="banner.id"
          v-show="currentIndex === banner.id - 1"
          class="banner-slide"
        >
          <div class="banner-content">
            <h1 class="banner-title">{{ banner.title }}</h1>
            <h2 class="banner-subtitle">{{ banner.subtitle }}</h2>
            <p class="banner-description">{{ banner.description }}</p>
            <router-link :to="banner.link" class="banner-button">
              了解更多
              <i class="fas fa-arrow-right"></i>
            </router-link>
          </div>
          <div class="banner-image">
            <img :src="banner.image" :alt="banner.title">
          </div>
        </div>
      </transition-group>

      <!-- 轮播图指示器 -->
      <div class="banner-indicators">
        <button 
          v-for="(banner, index) in banners" 
          :key="banner.id"
          class="indicator"
          :class="{ active: currentIndex === index }"
          @click="setCurrentIndex(index)"
        ></button>
      </div>

      <!-- 轮播图控制按钮 -->
      <button class="banner-control prev" @click="prevSlide">
        <i class="fas fa-chevron-left"></i>
      </button>
      <button class="banner-control next" @click="nextSlide">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { bannerList } from '@/data/bannerData'

export default {
  name: 'TheBanner',
  data() {
    return {
      banners: bannerList,
      currentIndex: 0,
      timer: null
    }
  },
  mounted() {
    this.startAutoPlay()
  },
  beforeUnmount() {
    this.stopAutoPlay()
  },
  methods: {
    startAutoPlay() {
      this.timer = setInterval(() => {
        this.nextSlide()
      }, 5000)
    },
    stopAutoPlay() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.banners.length
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.banners.length) % this.banners.length
    },
    setCurrentIndex(index) {
      this.currentIndex = index
    }
  }
}
</script>

<style scoped>
.banner {
  width: 100%;
  height: 600px;
  position: relative;
  overflow: hidden;
  margin-top: 0;
}

.banner-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.banner-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.banner-content {
  flex: 1;
  padding: 0 100px;
  color: white;
  z-index: 2;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.banner-title {
  font-size: 3em;
  margin-bottom: 20px;
  font-weight: 700;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s forwards;
}

.banner-subtitle {
  font-size: 1.5em;
  margin-bottom: 20px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 0.2s forwards;
}

.banner-description {
  font-size: 1.1em;
  margin-bottom: 30px;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 0.4s forwards;
}

.banner-button {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 30px;
  background: white;
  color: #667eea;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.8s 0.6s forwards;
  transition: all 0.3s ease;
}

.banner-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.banner-image {
  flex: 1;
  position: relative;
  opacity: 0;
  transform: translateX(50px);
  animation: fadeInRight 0.8s 0.8s forwards;
}

.banner-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(102,126,234,0.8), rgba(118,75,162,0.8));
}

.banner-indicators {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: white;
  transform: scale(1.2);
}

.banner-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  font-size: 1.2em;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
}

.banner-control:hover {
  background: rgba(255,255,255,0.3);
}

.banner-control.prev {
  left: 20px;
}

.banner-control.next {
  right: 20px;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .banner {
    height: 500px;
  }

  .banner-slide {
    flex-direction: column;
    text-align: center;
  }

  .banner-content {
    padding: 40px 20px;
    text-align: center;
  }

  .banner-title {
    font-size: 2em;
  }

  .banner-subtitle {
    font-size: 1.2em;
  }

  .banner-description {
    font-size: 1em;
  }

  .banner-image {
    display: none;
  }

  .banner-control {
    display: none;
  }
}
</style> 