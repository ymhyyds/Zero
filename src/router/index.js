import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

// 修复：router.push/replace 在被导航守卫重定向或重复导航时会抛出
// NavigationDuplicated / NavigationRedirected 错误，这些是 vue-router 的
// "正常"内部行为，但若调用处没有 .catch() 就会变成未捕获的运行时错误。
// 这里统一重写 push/replace，吞掉这两类无害的错误。
const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace

Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => {
    if (err && err.name !== 'NavigationDuplicated' && !/Redirected when going from/.test(err.message)) {
      return Promise.reject(err)
    }
  })
}

Router.prototype.replace = function replace(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalReplace.call(this, location, onResolve, onReject)
  }
  return originalReplace.call(this, location).catch(err => {
    if (err && err.name !== 'NavigationDuplicated' && !/Redirected when going from/.test(err.message)) {
      return Promise.reject(err)
    }
  })
}

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
