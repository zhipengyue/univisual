import type MockAdapter from 'axios-mock-adapter'
import mockProject from './project'
import mockPage from './page'
export default (adapter: MockAdapter) => {
  mockProject(adapter)
  mockPage(adapter)
}
