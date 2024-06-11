/**
 * 图层列表
 */

export interface Element {
  name: string
  className?: string
  children?: Element[]
  id: string
}
