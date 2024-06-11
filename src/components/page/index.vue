<template>
  <!-- <page-select v-if="useStore.state.playMode == playMode.editor"> -->
  <div class="page" @click="selectThis" :style="style">
    <page-select v-if="showSelect"> </page-select>
    <component
      v-for="(item, index) in renderList"
      :key="index"
      :index="index"
      :is="item.component"
      v-bind="item.props"
      @component-data="updateChildDataHandle"
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
  onUnmounted,
  toRef,
  reactive,
  nextTick,
  shallowRef
} from 'vue'
import { baseProps, containerProps } from '@/components/common/props'
import { usePageStore } from '@/stores/page'
import { useEditorStore } from '@/stores/editor'
import { useEventStore } from '@/stores/event'
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
    ...containerProps,
  },
  components: {
    pageSelect
  },
  setup(props) {
    const instance = getCurrentInstance()
    const children = toRef(props, 'children')
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
    const eventStore = useEventStore()
    // 设置当前页面
    useStore.state.page = componentData
    watch(()=>props.id,()=>{
      componentData.id = props.id
    })
    watch(()=>props.name,()=>{
      componentData.name = props.name
    })
    watch(()=>props.children,()=>{
      componentData.children = props.children
      componentData.children.forEach((item: any) => {
        addChild(item)
      })
      
    })
    watch(()=>props.childIds,()=>{
      componentData.childIds = props.childIds
    })
    watch(()=>props.style,()=>{
      componentData.style = props.style
    })
    watch(()=>props.type,()=>{
      componentData.type = props.type
    })
    watch(()=>children.value,()=>{
      // componentData.children = children.value
      componentData.childIds = children.value.map((item: any) => {
        return item.id
      })
    },{deep:true})
    onMounted(() => {
      eventStore.addEvent('component-sort', componentData.id, (data: any) => {
        if (componentData.id == data.id) {
          renderList.value = renderList.value.sort((a, b) => {
            return children.value.findIndex(item=>item.id==a.props.id) - children.value.findIndex(item=>item.id==b.props.id);
          }); 
          // console.log(children.value)
          instance?.proxy?.$forceUpdate();
        }
        
      })
      componentData.children.forEach((item: any) => {
        addChild(item)
      })
    })
    onUnmounted(() => {
      eventStore.removeEvent('component-sort', componentData.id)
    })
    if (useStore.state.playMode == playMode.editor) {
      editStore.setSelect(componentData)
    }
    const showSelect = computed(() => {
      return (
        editStore.select?.id === props.id && useStore.state.playMode == playMode.editor
      )
    })
    function selectThis() {
      editStore.setSelect(componentData)
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
          parentId: componentData.id,
          ...componentJson[child.name]
        })
        const componentChild = {
          component: acc[child.name].default,
          props: objData
        }
        renderList.value.push(componentChild)
        // children.value.push(componentChild)
        
        instance.proxy.$forceUpdate();

        componentData.childIds.push(objData.id)
      })
    }

    function getComponentData() {
      return instance.value['componentData']
    }
    function updateChildDataHandle(data: any) {
      const {index} = data
      data.componentData['parentId'] = componentData.id,
      children.value[index] = data.componentData
    }

    return {
      showSelect,
      renderList,
      children,
      editStore,
      instance,
      selectThis,
      addChild,
      getComponentData,
      updateChildDataHandle,
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
