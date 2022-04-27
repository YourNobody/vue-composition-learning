import { createRouter, createWebHistory } from 'vue-router'
import { Main, Auth, Users } from '@/views';

const routes = [
  {
    path: '/',
    component: Main,
    meta: {
      title: 'Main | App'
    }
  },
  {
    path: '/auth',
    component: Auth,
    meta: {
      title: 'Auth | App'
    }
  },
  {
    path: '/auth/:page',
    component: Auth,
    meta: {
      title: 'Auth | App'
    }
  },
  {
    path: '/users',
    component: Users,
    meta: {
      title: 'Users | App'
    }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router
