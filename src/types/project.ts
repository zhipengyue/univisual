export type Project = {
  /**
     {
    name: 'web页面测试1', //项目名称
    id: 5,
    layoutMode: 'web',
    pages: [1, 2, 3, 4, 5]
    }
     */
  name: string
  id: number
  layoutMode: string
  pages: number[]
  [key: string]: any
}
