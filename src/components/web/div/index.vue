<template>
  <div class="web-div" :style="style" @click="selectThis">
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
export default {
  name: 'web-div',
  props: {
    ...baseProps,
    ...containerProps
  },
  setup(props) {
    const componentData = reactive({
      id: props.id,
      name: props.name,
      childIds: props.childIds,
      style: props.style,
      type: props.type
    })
    const useStore = usePageStore()
    const editStore = useEditorStore()
    const instance = ref<any>(null)
    const children = shallowRef<any[]>([])
    onMounted(() => {})
    if (useStore.state.playMode == playMode.editor) {
      instance.value = getCurrentInstance()
      instance.value['componentData'] = componentData
      const obj = {
        instance: instance.value,
        addChild
      }
      editStore.setSelect(obj)
    }
    const showSelect = computed(() => {
      return (
        editStore.select?.instance === instance.value && useStore.state.playMode == playMode.editor
      )
    })
    function selectThis(event: any) {
      event.stopPropagation()
      event.preventDefault()
      console.log('------////')
      const obj = {
        instance: instance.value,
        addChild
      }
      editStore.setSelect(obj)
    }
    async function addChild(child: any) {
      const acc: any = {}
      const modules = editStore.state.webModules
      const pathList: Array<string> = Object.keys(modules)
      for (let i = 0; i < pathList.length; i++) {
        const path = pathList[i]
        const componentName: string = getComponetNameByPath(path)
        acc[componentName] = await importComponent(path)
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
        children.value.push(componentChild)
        instance.value.proxy.$forceUpdate()

        componentData.childIds.push(objData.id)
      })
    }

    return {
      showSelect,
      children,
      editStore,
      instance,
      addChild,
      selectThis,
      useStore,
      playMode
    }
  }
}
</script>
<style lang="scss">
.web-div {
  position: relative;
}
</style>
