export interface HtmlComponent {
  name: string // div
  label: string //<div></div>
  category: string // html5
  description?: string
}
export interface ElementComponent {
  name: string // 按钮
  type: string // Elbutton
  category: string // element-plus
  description?: string
}

export interface SecondaryComponentClassify {
  name: string // 区块类
  children: HtmlComponent[] | ElementComponent[]
}
export interface BaseComponentClassify {
  name: string
  children: SecondaryComponentClassify[]
}
