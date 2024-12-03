import type { RouteRecordRaw } from "vue-router";
import LoginView from "@/views/auth/LoginView.vue";
import LogoutView from "@/views/auth/LogoutView.vue";


export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'login',
        component: LoginView,
      },
      {
        path: 'logout',
        name: 'logout',
        component: LogoutView,
      },
    ],
  },
];
