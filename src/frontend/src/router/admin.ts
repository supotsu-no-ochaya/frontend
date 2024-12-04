import type { RouteRecordRaw } from "vue-router";
import AdminView from "@/views/admin/AdminView.vue";
import ManageUsersView from "@/views/admin/ManageUsersView.vue";
import ManageDishesView from "@/views/admin/ManageDishesView.vue";


export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin',
    children: [
      {
        path: '',
        name: 'admin',
        component: AdminView,
      },
      {
        path: 'users',
        name: 'manage-users',
        component: ManageUsersView,
      },
      {
        path: 'dishes',
        name: 'manage-dishes',
        component: ManageDishesView,
      },
    ],
  },
];
