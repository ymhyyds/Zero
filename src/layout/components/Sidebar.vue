<template>
  <div class="sidebar">
    <div class="logo">Vue2 Admin</div>
    <el-menu :default-active="$route.path" router background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff">
      <template v-for="route in visibleRoutes">
        <el-menu-item v-if="route.children && route.children.length === 1" :key="route.path" :index="resolvePath(route, route.children[0])">
          <i :class="route.children[0].meta.icon"></i>
          <span slot="title">{{ route.children[0].meta.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { constantRoutes } from '@/router'

export default {
  name: 'Sidebar',
  computed: {
    visibleRoutes() {
      const roles = this.$store.getters.roles
      return constantRoutes.filter(route => {
        if (route.hidden || !route.children) return false
        const meta = route.children[0].meta || route.meta || {}
        return !meta.roles || roles.some(role => meta.roles.includes(role))
      })
    }
  },
  methods: {
    resolvePath(route, child) {
      if (route.path === '/') return `/${child.path}`
      return child.path ? `${route.path}/${child.path}` : route.path
    }
  }
}
</script>

<style scoped>
.logo { height: 56px; line-height: 56px; text-align: center; color: #fff; font-weight: 700; font-size: 18px; }
.sidebar, .el-menu { border-right: 0; }
</style>
