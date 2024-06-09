<template>
  <div class="editor-main" id="canvas-wp" ref="editorRef">
    <!-- <align-line /> -->
    <div class="bg" @click="cancelSelect"></div>
    <div
      class="ruler-container"
      :style="{ width: sizeInfo.width + 'px', height: sizeInfo.height + 'px' }"
    >
      <ruler></ruler>
    </div>
    <canvas-main />
  </div>
</template>
<script lang="ts" setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import CanvasMain from './canvas-main/index.vue'
import AlignLine from './align-line.vue'
import Ruler from './ruler/index.vue'
import { useEditorStore } from '@/stores/editor'
import { useEventStore } from '@/stores/event'
const userStore = useEditorStore()
const eventStore = useEventStore()
const render = ref<boolean>(true)
let renderTimeout: any = null
const editorRef = ref<any>()
const sizeInfo = ref<any>({
  width: 0,
  height: 0
})
onMounted(() => {
  // resize
  window.addEventListener('resize', resizeHandle)
  eventStore.addEvent('editor-resize', 'editor-canvas', resizeHandle)
  sizeInfo.value = {
    width: editorRef.value?.clientWidth || 100,
    height: editorRef.value?.clientHeight || 100
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', resizeHandle)
  eventStore.removeEvent('editor-resize', 'editor-canvas')
})
function resizeHandle() {
  render.value = false
  if (renderTimeout) {
    clearTimeout(renderTimeout)
  }
  renderTimeout = setTimeout(() => {
    sizeInfo.value = {
      width: editorRef.value?.clientWidth || 100,
      height: editorRef.value?.clientHeight || 100
    }
    render.value = true
  }, 300)
}
watch(
  () => sizeInfo.value,
  (newV) => {
    console.log(newV.width)
    userStore.state.canvas.width = newV.width
    userStore.state.canvas.height = newV.height
  },
  { deep: true }
)
function cancelSelect() {
  userStore.cancelSelect()
}
</script>
<style lang="scss">
.editor-main {
  position: relative;
  flex-grow: 1;
  height: 100%;
  user-select: none;
  overflow: scroll;
  background: url('@/assets/images/bg-canvas.png');
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  /* 整体滚动条样式 */
  &::-webkit-scrollbar {
    width: 3px;
    height: 2px;
  }

  /* 滚动条轨道颜色 */
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* 滚动条滑块颜色 */
  &::-webkit-scrollbar-thumb {
    background: #434343;
  }

  &::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .ruler-container {
    position: fixed;
    z-index: 1;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
  }
}
</style>
