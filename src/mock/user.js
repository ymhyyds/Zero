import Mock from 'mockjs'

let users = Mock.mock({
  'list|35': [{
    'id|+1': 1,
    name: '@cname',
    email: '@email',
    role: '@pick(["admin", "editor"])',
    status: '@pick(["启用", "禁用"])',
    createdAt: '@datetime("yyyy-MM-dd HH:mm:ss")'
  }]
}).list

export default [
  {
    url: '/api/users',
    type: 'get',
    response: config => {
      const { page = 1, pageSize = 10, keyword = '' } = config.query
      const filtered = users.filter(user => user.name.includes(keyword) || user.email.includes(keyword))
      const start = (Number(page) - 1) * Number(pageSize)
      return {
        code: 200,
        data: {
          list: filtered.slice(start, start + Number(pageSize)),
          total: filtered.length
        }
      }
    }
  },
  {
    url: '/api/users',
    type: 'post',
    response: config => {
      const body = JSON.parse(config.body)
      const newUser = { id: Date.now(), createdAt: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'), ...body }
      users.unshift(newUser)
      return { code: 200, data: newUser, message: '创建成功' }
    }
  },
  {
    url: /\/api\/users\/\d+/,
    type: 'put',
    response: config => {
      const id = Number(config.url.match(/\d+$/)[0])
      const body = JSON.parse(config.body)
      users = users.map(user => (user.id === id ? { ...user, ...body } : user))
      return { code: 200, data: true, message: '更新成功' }
    }
  },
  {
    url: /\/api\/users\/\d+/,
    type: 'delete',
    response: config => {
      const id = Number(config.url.match(/\d+$/)[0])
      users = users.filter(user => user.id !== id)
      return { code: 200, data: true, message: '删除成功' }
    }
  }
]
