import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: { title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        meta: { title: 'Dashboard', icon: 'el-icon-data-analysis', roles: ['admin', 'editor'] }
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    meta: { title: '用户管理', icon: 'el-icon-user', roles: ['admin'] },
    children: [
      {
        path: '',
        component: () => import('@/views/users'),
        meta: { title: '用户管理', icon: 'el-icon-user', roles: ['admin'] }
      }
    ]
  },
  {
    path: '*',
    redirect: '/dashboard',
    hidden: true
  }
]

const createRouter = () => new Router({
  mode: 'hash',
  routes: constantRoutes
})

const router = createRouter()

export default router
