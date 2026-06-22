import Mock from 'mockjs'
import auth from './auth'
import user from './user'

const mocks = [...auth, ...user]

function registerMock() {
  mocks.forEach(item => {
    Mock.mock(item.url, item.type, options => {
      const url = new URL(options.url, window.location.origin)
      const query = Object.fromEntries(url.searchParams.entries())
      return item.response({ ...options, query })
    })
  })
}

registerMock()
Mock.setup({ timeout: '300-800' })
