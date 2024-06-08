import { toRef,ref,watch,defineAsyncComponent } from 'vue'
import { baseProps } from '../baseProps/base'
import { containerProps } from '../baseProps/container'
import shortid from 'shortid'
export default {
  name: 'clickContainer',
  props: {
    ...baseProps,
    ...containerProps
  },
  setup(props) {
    const componentInstance = ref<any[]>([])
    const chidlren = toRef<Array<any>>(props.children)
    watch(()=>chidlren.value.length,()=>{

    },{deep:true})
    const addChild = (child: any) => {
      const component = defineAsyncComponent(() => import(child.path));
      console.log(component)
      chidlren.value.push(component)
    }
    const removeChild = (child: any) => {
      chidlren.value.splice(chidlren.value.indexOf(child), 1)
    }
    return { chidlren, addChild, removeChild }
  }
}
