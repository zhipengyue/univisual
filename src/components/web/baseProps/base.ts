import path from 'path'
import { type StyleHTMLAttributes, type StyleValue, type PropType } from 'vue'
export const baseProps = {
  style: {
    type: Object as PropType<StyleValue>,
    default: () => ({})
  },
  name: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: () => ''
  }
}
