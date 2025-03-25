import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import '@fortawesome/fontawesome-free/css/all.css'

loadFonts()

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
