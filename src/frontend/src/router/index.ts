import { createRouter, createWebHashHistory } from 'vue-router'
import { routes, handleHotUpdate } from 'vue-router/auto-routes';
import { ROLE_IDS } from "@/constants.ts";
import { authService } from "@/services/user/authService.ts";


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async(to, from) => {
  if ([/^\/$/, /^\/auth/].some(test => test.test(to.path))) {
    return true;
  }
  const user = authService.getCurrentUser();
  if (user === null) {
    return { name: '/auth/login' };
  } else if (user.role === ROLE_IDS.admin && to.path.startsWith('/admin')) {
    return true;
  } else if (user.role === ROLE_IDS.waiter && to.path.startsWith('/waiter')) {
    return true;
  } else if (user.role === ROLE_IDS.kitchen && to.path.startsWith('/kitchen')) {
    return true;
  }
  alert("Access Denied");
  return false;
});

if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;
