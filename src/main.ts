import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

// import routes generated by Voie
import routes from 'vite-plugin-pages/client'

import App from './App.vue'

const app = createApp(App)
const router = createRouter({
  history: createWebHistory(),
  routes
})
app.use(router)

app.mount('#app')