<template>
  <div class="web-div" :style="componentData?.style" @click="selectThis">
    {{ text }}
    <page-select v-if="showSelect"> </page-select>
  </div>
</template>
<script lang="ts">
import {
  computed,
  ref,
  getCurrentInstance,
  watch,
  onMounted,
  toRef,
  reactive,
  nextTick,
  shallowRef
} from 'vue'
import { baseProps, containerProps } from '@/components/common/props'
import { usePageStore } from '@/stores/page'
import { useEditorStore } from '@/stores/editor'
import { playMode } from '@/dict/play'
import { getComponetNameByPath, importComponent } from '@/components/common/methods'
import componentJson from '@/data/component.data.json'
import { type WebComponentName } from '@/types/component'
import shortid from 'shortid'
import merge from 'lodash/merge'
import { emitsList } from '@/components/common/emits'
export default {
  name: 'web-div',
  props: {
    ...baseProps,
    ...containerProps
  },
  emits:[...emitsList],
  setup(props,{emit}) {
    const children = shallowRef<any[]>([])
    const childIds = toRef(props, 'childIds')
    const renderList = shallowRef<any[]>([])
    const componentData = reactive({
      id: props.id,
      name: props.name,
      childIds: childIds.value,
      children: children,
      style: props.style,
      type: props.type,
      methods:{
        addChild
      }
    })
    const useStore = usePageStore()
    const editStore = useEditorStore()
    onMounted(() => {
      emit('component-data',{
        index:props.index,
        componentData
      })
    })
    /**添加就被选中
    if (useStore.state.playMode == playMode.editor) {
      editStore.setSelect(componentData)
    }
    **/
   watch(()=>componentData,(newV)=>{
      console.log(newV)
   },{deep:true})
    const showSelect = computed(() => {
      return (
        editStore.select?.id === props.id && useStore.state.playMode == playMode.editor
      )
    })
    function selectThis(event: any) {
      event.stopPropagation()
      event.preventDefault()
      editStore.setSelect(componentData)
    }
    async function addChild(child: any) {
      const acc: any = {}
      const modules = editStore.state.webModules
      const pathList: Array<string> = Object.keys(modules)
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const componentName: string = getComponetNameByPath(path)
        acc[componentName] = await import(`${path}`)
      }
      nextTick(() => {
        const objData: any = merge({
          id: shortid.generate(),
          ...componentJson[child.name]
        })
        const componentChild = {
          component: acc[child.name].default,
          props: objData
        }
        renderList.value.push(componentChild)
      })
    }

    return {
      showSelect,
      children,
      editStore,
      addChild,
      selectThis,
      useStore,
      playMode,
      componentData
    }
  }
}
</script>
<style lang="scss">
.web-div {
  position: relative;
}
</style>
