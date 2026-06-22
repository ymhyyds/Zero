const users = {
  admin: {
    password: '123456',
    token: 'admin-token',
    name: '管理员',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    roles: ['admin']
  },
  editor: {
    password: '123456',
    token: 'editor-token',
    name: '编辑',
    avatar: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
    roles: ['editor']
  }
}

export default [
  {
    url: '/api/login',
    type: 'post',
    response: config => {
      const { username, password } = JSON.parse(config.body)
      const user = users[username]
      if (!user || user.password !== password) {
        return { code: 401, message: '用户名或密码错误' }
      }
      return { code: 200, data: { token: user.token }, message: '登录成功' }
    }
  },
  {
    url: '/api/user/info',
    type: 'get',
    response: config => {
      const token = (config.headers.Authorization || '').replace('Bearer ', '')
      const user = Object.values(users).find(item => item.token === token)
      if (!user) return { code: 401, message: '登录已过期' }
      return { code: 200, data: user }
    }
  }
]
