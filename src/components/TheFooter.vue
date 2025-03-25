<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>快速链接</h3>
          <router-link to="/" class="footer-link">首页</router-link>
          <router-link to="/about" class="footer-link">关于我们</router-link>
          <router-link to="/products" class="footer-link">商品列表</router-link>
          <router-link to="/news" class="footer-link">新闻列表</router-link>
          <router-link to="/contact" class="footer-link">联系我们</router-link>
        </div>
        <div class="footer-section">
          <h3>联系我们</h3>
          <p>电话：400-123-4567</p>
          <p>邮箱：contact@example.com</p>
          <p>地址：北京市朝阳区xxx大厦</p>
        </div>
        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="social-links">
            <a href="#" class="social-link"><i class="fab fa-weixin"></i></a>
            <a href="#" class="social-link"><i class="fab fa-weibo"></i></a>
            <a href="#" class="social-link"><i class="fab fa-qq"></i></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© 2024 您的公司名称. 保留所有权利.</p>
        <p><a href="https://beian.miit.gov.cn/" target="_blank">京ICP备XXXXXXXX号-1</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>

<style scoped>
.footer {
  background: #2d3748;
  color: white;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  color: #667eea;
  margin-bottom: 20px;
  font-size: 1.2em;
}

.footer-link {
  display: block;
  color: #cbd5e0;
  text-decoration: none;
  margin-bottom: 10px;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #667eea;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-link {
  color: #cbd5e0;
  font-size: 24px;
  transition: color 0.3s ease;
}

.social-link:hover {
  color: #667eea;
}

.footer-bottom {
  border-top: 1px solid #4a5568;
  padding-top: 20px;
  text-align: center;
  color: #cbd5e0;
}

.footer-bottom p {
  margin: 5px 0;
}

.footer-bottom a {
  color: #cbd5e0;
  text-decoration: none;
}

.footer-bottom a:hover {
  color: #667eea;
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style> 