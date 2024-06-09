import { type StyleHTMLAttributes, type StyleValue, type PropType } from 'vue'
import { type HtmlComponent, type ElementComponent } from '@/types/component'
export const baseProps = {
  style: {
    type: Object as PropType<StyleValue>,
    default: () => ({})
  },
  name: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => ''
  },
  text: {
    type: String,
    default: () => ''
  },
  path: {
    type: String,
    default: () => ''
  },
  type: {
    type: String,
    default: () => ''
  }
}

export const containerProps = {
  childIds: {
    type: Array<string> as PropType<string[]>,
    default: () => []
  },
  children: {
    type: Array<HtmlComponent | ElementComponent> as PropType<HtmlComponent[] | ElementComponent[]>,
    default: () => []
  }
}
