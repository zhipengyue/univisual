import { type PropType } from 'vue'
import { type HtmlComponent, type ElementComponent } from '@/types/component'
export const containerProps = {
  children: {
    type: Array<HtmlComponent | ElementComponent> as PropType<HtmlComponent[] | ElementComponent[]>,
    default: () => []
  }
}
