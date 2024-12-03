import type { RouteRecordRaw } from "vue-router";
import WaiterTablesListView from "@/views/waiter/TablesListView.vue";
import TableDetailsView from "@/views/waiter/table/TableDetailsView.vue";
import TablePaymentView from "@/views/waiter/table/TablePaymentView.vue";
import OrderDetailsView from "@/views/waiter/table/order/OrderDetailsView.vue";
import DishCategoriesView from "@/views/waiter/table/order/dishes/DishCategoriesView.vue";
import DishSelectionView from "@/views/waiter/table/order/dishes/DishSelectionView.vue";


export const waiterRoutes: RouteRecordRaw[] = [
  {
    path: 'waiter',
    children: [
      { path: '', name: 'waiter', redirect: { name: 'tables-list' } },
      {
        path: 'tables',
        name: 'tables-list',
        component: WaiterTablesListView,
      },
      {
        path: 'table/:tableId',
        children: [
          {
            path: '',
            name: 'table-details',
            component: TableDetailsView,
          },
          {
            path: 'payment',
            name: 'table-payment',
            component: TablePaymentView,
          },
          {
            path: 'order',
            children: [
              {
                path: '',
                name: 'table-orders',
                component: OrderDetailsView,
              },
              {
                path: 'categories',
                name: 'dish-categories',
                component: DishCategoriesView,
              },
              {
                path: 'add/:dishCategory',
                children: [
                  {
                    path: 'dishes',
                    name: 'add-dishes',
                    component: DishSelectionView,
                  }
                ],
              }
            ],
          },
        ],
      },
    ],
  },
];
