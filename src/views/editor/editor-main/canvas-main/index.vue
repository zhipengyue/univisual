<template>
  <div
    class="canvas-main"
    :style="{
      width: canvasStyle.width + 'px',
      height: canvasStyle.height + 'px',
      scale: canvasStyle.scale,
      transform: `translate(${canvasStyle.translateX}px ${canvasStyle.translateY}px)`,
      'background-size': `${(1 / canvasStyle.scale) * 16}px ${(1 / canvasStyle.scale) * 16}px`
    }"
  >
    <component :is="tempInstance" v-bind="pageData" :key="pageData.id"/>
  </div>
</template>

<script lang="ts" setup>
import { toRef, onMounted, watch, ref, nextTick, defineAsyncComponent } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { usePageStore } from '@/stores/page'
import { useEventStore } from '@/stores/event';

const pageStore = usePageStore()
const useStore = useEditorStore()
const eventStore = useEventStore()
const canvasStyle = ref<any>({})
const tempInstance = defineAsyncComponent(() => import('@/components/page/index.vue'))
// 读取page信息
// setTimeout(() => {
//   console.log('-----------')
//   console.log(useStore.select.instance)
// }, 5000)
const pageData = ref<any>({})
watch(
  () => useStore.state.canvas,
  (newV) => {
    console.log(newV.width)
    canvasStyle.value = useStore.state.canvas
  },
  { deep: true }
)
watch(
  () => pageStore.state.pageData,
  () => {
    // const { id, style, type, children, childIds } = pageStore.state.pageData
    pageData.value = pageStore.state.pageData
  },
  { deep: true }
)
onMounted(() => {
  canvasStyle.value = useStore.state.canvas
  eventStore.addEvent('page-change','canvas-main',()=>{
    pageData.value = pageStore.state.page
  })
})
</script>
<style lang="scss">
.canvas-main {
  position: absolute;
  top: 60px;
  left: 60px;
  transform-origin: 0 0;
  transition: all 0.2 ease;
  margin-right: 60px;
  margin-bottom: 60px;
  overflow: hidden;
  background: url('@/assets/images/bg-canvas-main.jpg') repeat;
  &::after {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    right: -60px;
    bottom: -60px;
  }
}
</style>
