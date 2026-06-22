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
      next({ path: '/' })
      return
    }

    if (!store.getters.roles.length) {
      try {
        await store.dispatch('user/getInfo')
      } catch (error) {
        await store.dispatch('user/logout')
        next(`/login?redirect=${to.path}`)
        return
      }
    }

    if (hasRoutePermission(to, store.getters.roles)) {
      next()
    } else {
      next('/dashboard')
    }
    return
  }

  if (whiteList.includes(to.path)) {
    next()
  } else {
    next(`/login?redirect=${to.path}`)
  }
})
