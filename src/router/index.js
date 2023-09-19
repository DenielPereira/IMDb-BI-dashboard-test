import { createRouter, createWebHistory } from 'vue-router'
import UserLogin from '../views/UserLogin.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: UserLogin
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AppDashboard.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/'); 
  } else {
    next();
  }
});

function isAuthenticated() {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('expiration');

  if (token && expiration) {
    const expirationDate = new Date(expiration);

    if (expirationDate > new Date()) {
      localStorage.setItem('userAuthenticated', atob(token));
      return true;
    }
  }

  return false;
}

export default router
