import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import kitchen from '@/views/kitchen.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/kitchen',
      name: 'department',
      component: kitchen
    },
  ]
})

export default router
