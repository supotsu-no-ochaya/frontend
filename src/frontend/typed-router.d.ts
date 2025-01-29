/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...paths]': RouteRecordInfo<'/[...paths]', '/:paths(.*)', { paths: ParamValue<true> }, { paths: ParamValue<false> }>,
    '/admin/': RouteRecordInfo<'/admin/', '/admin', Record<never, never>, Record<never, never>>,
    '/admin/event/': RouteRecordInfo<'/admin/event/', '/admin/event', Record<never, never>, Record<never, never>>,
    '/admin/menu/': RouteRecordInfo<'/admin/menu/', '/admin/menu', Record<never, never>, Record<never, never>>,
    '/admin/menu/items/': RouteRecordInfo<'/admin/menu/items/', '/admin/menu/items', Record<never, never>, Record<never, never>>,
    '/admin/menu/items/[itemId]/edit': RouteRecordInfo<'/admin/menu/items/[itemId]/edit', '/admin/menu/items/:itemId/edit', { itemId: ParamValue<true> }, { itemId: ParamValue<false> }>,
    '/admin/menu/items/create': RouteRecordInfo<'/admin/menu/items/create', '/admin/menu/items/create', Record<never, never>, Record<never, never>>,
    '/admin/menu/menus/': RouteRecordInfo<'/admin/menu/menus/', '/admin/menu/menus', Record<never, never>, Record<never, never>>,
    '/admin/stock/': RouteRecordInfo<'/admin/stock/', '/admin/stock', Record<never, never>, Record<never, never>>,
    '/admin/users/': RouteRecordInfo<'/admin/users/', '/admin/users', Record<never, never>, Record<never, never>>,
    '/admin/users/create': RouteRecordInfo<'/admin/users/create', '/admin/users/create', Record<never, never>, Record<never, never>>,
    '/auth/login': RouteRecordInfo<'/auth/login', '/auth/login', Record<never, never>, Record<never, never>>,
    '/auth/logout': RouteRecordInfo<'/auth/logout', '/auth/logout', Record<never, never>, Record<never, never>>,
    '/kitchen/': RouteRecordInfo<'/kitchen/', '/kitchen', Record<never, never>, Record<never, never>>,
    '/waiter/': RouteRecordInfo<'/waiter/', '/waiter', Record<never, never>, Record<never, never>>,
    '/waiter/table/[tableId]/': RouteRecordInfo<'/waiter/table/[tableId]/', '/waiter/table/:tableId', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/table/[tableId]/order': RouteRecordInfo<'/waiter/table/[tableId]/order', '/waiter/table/:tableId/order', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/table/[tableId]/payment': RouteRecordInfo<'/waiter/table/[tableId]/payment', '/waiter/table/:tableId/payment', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/table/[tableId]/person/[personId]/order/': RouteRecordInfo<'/waiter/table/[tableId]/person/[personId]/order/', '/waiter/table/:tableId/person/:personId/order', { tableId: ParamValue<true>, personId: ParamValue<true> }, { tableId: ParamValue<false>, personId: ParamValue<false> }>,
    '/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/': RouteRecordInfo<'/waiter/table/[tableId]/person/[personId]/order/[categoryIds]+/', '/waiter/table/:tableId/person/:personId/order/:categoryIds+', { tableId: ParamValue<true>, personId: ParamValue<true>, categoryIds: ParamValueOneOrMore<true> }, { tableId: ParamValue<false>, personId: ParamValue<false>, categoryIds: ParamValueOneOrMore<false> }>,
    '/waiter/tables': RouteRecordInfo<'/waiter/tables', '/waiter/tables', Record<never, never>, Record<never, never>>,
  }
}
