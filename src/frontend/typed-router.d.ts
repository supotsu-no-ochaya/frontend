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
    '/admin/dishes': RouteRecordInfo<'/admin/dishes', '/admin/dishes', Record<never, never>, Record<never, never>>,
    '/admin/users': RouteRecordInfo<'/admin/users', '/admin/users', Record<never, never>, Record<never, never>>,
    '/auth/login': RouteRecordInfo<'/auth/login', '/auth/login', Record<never, never>, Record<never, never>>,
    '/auth/logout': RouteRecordInfo<'/auth/logout', '/auth/logout', Record<never, never>, Record<never, never>>,
    '/kitchen/': RouteRecordInfo<'/kitchen/', '/kitchen', Record<never, never>, Record<never, never>>,
    '/kitchen/kitchen': RouteRecordInfo<'/kitchen/kitchen', '/kitchen/kitchen', Record<never, never>, Record<never, never>>,
    '/waiter/table/[tableId]/': RouteRecordInfo<'/waiter/table/[tableId]/', '/waiter/table/:tableId', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/table/[tableId]/order/': RouteRecordInfo<'/waiter/table/[tableId]/order/', '/waiter/table/:tableId/order', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/table/[tableId]/order/dishes/': RouteRecordInfo<'/waiter/table/[tableId]/order/dishes/', '/waiter/table/:tableId/order/dishes', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/table/[tableId]/order/dishes/[dishCategory]': RouteRecordInfo<'/waiter/table/[tableId]/order/dishes/[dishCategory]', '/waiter/table/:tableId/order/dishes/:dishCategory', { tableId: ParamValue<true>, dishCategory: ParamValue<true> }, { tableId: ParamValue<false>, dishCategory: ParamValue<false> }>,
    '/waiter/table/[tableId]/order/list': RouteRecordInfo<'/waiter/table/[tableId]/order/list', '/waiter/table/:tableId/order/list', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/table/[tableId]/payment': RouteRecordInfo<'/waiter/table/[tableId]/payment', '/waiter/table/:tableId/payment', { tableId: ParamValue<true> }, { tableId: ParamValue<false> }>,
    '/waiter/tables': RouteRecordInfo<'/waiter/tables', '/waiter/tables', Record<never, never>, Record<never, never>>,
  }
}
