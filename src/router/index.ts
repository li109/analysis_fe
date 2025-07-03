import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/components/layout/MainPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
      redirect: '/stock/list',
      children: [
        {
          path: '/stock/list',
          name: 'StockList',
          meta: { breadcrumb: ['stock', 'list'] },
          component: () => import('@/views/stock/List.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/Login.vue')
    }
  ]
})

export default router
