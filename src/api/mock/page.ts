import Mock from 'mockjs'
import type MockAdapter from 'axios-mock-adapter'

export default (adapter: MockAdapter) => {
  // 项目基本信息
  adapter.onGet(/\/page\/\d+$/).reply(
    200,
    Mock.mock({
      code: 0,
      message: 'ok',
      data: {
        id: 1,
        name: '@word',
        type: 'page',
        style: {
          height: '100px',
          background: '#00cc99'
        }
      }
    })
  )
}
