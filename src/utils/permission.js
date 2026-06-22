import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'

const whiteList = ['/login']

function hasRoutePermission(route, roles) {
  if (!route.meta || !route.meta.roles) return true
  return roles.some(role => route.meta.roles.includes(role))
}

router.beforeEach(async (to, from, next) => {
  const token = getToken()

  if (token) {
    if (to.path === '/login') {
      next({ path: '/dashboard', replace: true })
      return
    }

    if (!store.getters.roles || !store.getters.roles.length) {
      try {
        await store.dispatch('user/getInfo')
      } catch (e) {
        await store.dispatch('user/logout')
        next({ path: '/login', replace: true })
        return
      }
    }

    const roles = store.getters.roles || []

    const hasPermission =
      !to.meta?.roles ||
      roles.some(r => to.meta.roles.includes(r))

    if (hasPermission) {
      next()
    } else {
      if (to.path !== '/dashboard') {
        next({ path: '/dashboard', replace: true })
      } else {
        next()
      }
    }
    return
  }
  
  if (whiteList.includes(to.path)) {
    next()
  } else {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
      replace: true
    })
  }
})