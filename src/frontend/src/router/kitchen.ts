import type { RouteRecordRaw } from "vue-router";
import KitchenView from "@/views/kitchen/KitchenView.vue";


export const kitchenRoutes: RouteRecordRaw[] = [
  {
    path: 'kitchen',
    children: [
      {
        path: '',
        name: 'kitchen',
        component: KitchenView,
      },
    ],
  },
];
