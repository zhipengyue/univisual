<template>
  <!-- <page-select v-if="useStore.state.playMode == playMode.editor"> -->
  <div class="page" @click="selectThis" :style="style">
    <page-select v-if="showSelect"> </page-select>
    <component
      v-for="(item, index) in children"
      :key="index"
      :is="item.component"
      v-bind="item.props"
    />
  </div>
  <!-- </page-select> -->
</template>
<script lang="ts">
import pageSelect from '@/components/ui/page-select/index.vue'
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
  name: 'web-page',
  props: {
    ...baseProps,
    ...containerProps
  },
  components: {
    pageSelect
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
    function selectThis() {
      const obj = {
        instance: instance.value,
        addChild
      }
      editStore.setSelect(obj)
    }
    // 保存数据时获取JOSN数据
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

    function getComponentData() {
      return instance.value['componentData']
    }
    return {
      showSelect,
      children,
      editStore,
      instance,
      selectThis,
      addChild,
      getComponentData,
      useStore,
      playMode
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
:deep(.svg-button .content) {
  padding: 0;
}
</style>
