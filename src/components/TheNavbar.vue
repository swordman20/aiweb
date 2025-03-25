<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/ailogo.png" alt="Logo">
        </router-link>
      </div>
      <div class="nav-links">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/about" class="nav-item">关于我们</router-link>
        <router-link to="/products" class="nav-item">商品列表</router-link>
        <router-link to="/news" class="nav-item">新闻列表</router-link>
        <router-link to="/contact" class="nav-item" @click="closeMenu">联系我们</router-link>
      </div>
      <div class="search-box">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="搜索..." 
          @keyup.enter="handleSearch"
        >
        <button @click="handleSearch">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <div class="mobile-menu-btn" @click="toggleMenu">
        <i class="fas fa-bars"></i>
      </div>
    </div>
    <!-- 移动端菜单 -->
    <div class="mobile-menu" :class="{ 'show': isMenuOpen }">
      <router-link to="/" class="nav-item" @click="closeMenu">首页</router-link>
      <router-link to="/about" class="nav-item" @click="closeMenu">关于我们</router-link>
      <router-link to="/products" class="nav-item" @click="closeMenu">商品列表</router-link>
      <router-link to="/news" class="nav-item" @click="closeMenu">新闻列表</router-link>
      <router-link to="/contact" class="nav-item" @click="closeMenu">联系我们</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      isMenuOpen: false,
      searchQuery: ''
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      // 防止菜单打开时页面可以滚动
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        this.$router.push({
          path: '/search',
          query: { q: this.searchQuery.trim() }
        })
      }
    }
  },
  // 组件销毁时清理样式
  beforeUnmount() {
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.navbar {
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo img {
  height: 40px;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  color: #2d3748;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  padding: 5px 0;
}

.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #667eea;
  transition: width 0.3s ease;
}

.nav-item:hover::after,
.nav-item.router-link-active::after {
  width: 100%;
}

.search-box {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.search-box input {
  padding: 8px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  width: 200px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.search-box input:focus {
  outline: none;
  border-color: #667eea;
  width: 250px;
}

.search-box button {
  background: none;
  border: none;
  color: #2d3748;
  cursor: pointer;
  padding: 8px;
  margin-left: 5px;
  transition: color 0.3s ease;
}

.search-box button:hover {
  color: #667eea;
}

.mobile-menu-btn {
  display: none;
  font-size: 1.5em;
  color: #2d3748;
  cursor: pointer;
}

.mobile-menu {
  display: none;
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transform: translateY(-100%);
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 999;
}

.mobile-menu.show {
  display: flex;
  flex-direction: column;
  transform: translateY(0);
  opacity: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .search-box {
    display: none;
  }

  .mobile-menu-btn {
    display: block;
  }

  .mobile-menu {
    display: none;
  }

  .mobile-menu.show {
    display: flex;
  }

  .mobile-menu .nav-item {
    padding: 15px 0;
    border-bottom: 1px solid #e2e8f0;
    text-align: center;
  }

  .mobile-menu .nav-item:last-child {
    border-bottom: none;
  }
}
</style> 