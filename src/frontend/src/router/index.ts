import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Page404View from "@/views/Page404View.vue";
import { authRoutes } from "@/router/auth.ts";
import { adminRoutes } from "@/router/admin.ts";
import { kitchenRoutes } from "@/router/kitchen.ts";
import { waiterRoutes } from "@/router/waiter.ts";


export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    ...authRoutes,
    ...waiterRoutes,
    ...kitchenRoutes,
    ...adminRoutes,
    {
      path: '/:pathMatch(.*)*',
      children: [{ path: '', component: Page404View, }],
    }
  ],
});
