<template>
  <el-container class="layout">
    <el-aside width="220px" class="layout-sidebar">
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header height="56px" class="layout-navbar">
        <Navbar />
      </el-header>
      <el-main class="layout-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

export default {
  name: 'Layout',
  components: { Sidebar, Navbar }
}
</script>

<style scoped>
.layout { height: 100%; }
.layout-sidebar { background: #304156; }
.layout-navbar { padding: 0; background: #fff; border-bottom: 1px solid #ebeef5; }
.layout-main { background: #f5f7fa; }
</style>
