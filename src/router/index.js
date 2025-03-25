import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/Home.vue'
import AboutPage from '@/views/About.vue'
import ProductList from '@/views/ProductList.vue'
import ProductDetail from '@/views/ProductDetail.vue'
import NewsList from '@/views/NewsList.vue'
import NewsDetail from '@/views/NewsDetail.vue'
import Contact from '@/views/Contact.vue'
import SearchResults from '@/views/SearchResults.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/product/:id',
    name: 'ProductDetail',
    component: ProductDetail
  },
  {
    path: '/news',
    name: 'NewsList',
    component: NewsList
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router