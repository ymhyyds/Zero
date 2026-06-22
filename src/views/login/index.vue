<template>
  <div class="login-page">
    <el-card class="login-card">
      <h2>后台管理系统</h2>
      <el-form ref="form" :model="form" :rules="rules" @keyup.enter.native="handleLogin">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="el-icon-user" placeholder="用户名：admin/editor" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="el-icon-lock" placeholder="密码：123456" show-password />
        </el-form-item>
        <el-button type="primary" :loading="loading" class="login-button" @click="handleLogin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      form: { username: 'admin', password: '123456' },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    handleLogin() {
      this.$refs.form.validate(async valid => {
        if (!valid) return
        this.loading = true
        try {
          await this.$store.dispatch('user/login', this.form)
          this.$router.push(this.$route.query.redirect || '/')
        } finally {
          this.loading = false
        }
      })
    }
  }
}
</script>

<style scoped>
.login-page { height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #1f2d3d, #409eff); }
.login-card { width: 380px; }
h2 { text-align: center; margin: 0 0 24px; }
.login-button { width: 100%; }
</style>
