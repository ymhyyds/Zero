<template>
  <div class="navbar">
    <div class="title">{{ $route.meta.title }}</div>
    <el-dropdown @command="handleCommand">
      <span class="user-info">
        <el-avatar :size="32" :src="avatar" />
        <span>{{ name }}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item disabled>{{ roles.join(', ') }}</el-dropdown-item>
        <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  computed: {
    name() { return this.$store.getters.name },
    avatar() { return this.$store.getters.avatar },
    roles() { return this.$store.getters.roles }
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style scoped>
.navbar { height: 56px; padding: 0 20px; display: flex; align-items: center; justify-content: space-between; }
.title { font-size: 18px; font-weight: 600; }
.user-info { display: inline-flex; align-items: center; gap: 8px; cursor: pointer; }
</style>
