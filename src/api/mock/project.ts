import Mock from 'mockjs'
import type MockAdapter from 'axios-mock-adapter'

export default (adapter: MockAdapter) => {
  // 项目页面信息,1,2,3,4,5 //页面id
  adapter.onGet(/\/project\/\d+$/).reply(
    200,
    Mock.mock({
      code: 0,
      message: 'ok',
      data: {
        name: 'web页面测试1', //项目名称
        id: 5,
        layoutMode: 'web',
        pages: []
      }
    })
  )
}
