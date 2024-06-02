<template>
  <div
    class="canvas-main"
    :style="{
      width: canvasStyle.width + 'px',
      height: canvasStyle.height + 'px',
      scale: canvasStyle.scale,
      transform: `translate(${canvasStyle.translateX}px ${canvasStyle.translateY}px)`,
      'background-image': canvasStyle.backgroundImage
    }"
  >
    <page v-bind="pageStore.page"></page>
  </div>
</template>

<script lang="ts" setup>
import { toRef, onMounted, watch, ref, nextTick } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { usePageStore } from '@/stores/page'
import page from '@/components/web/page.vue'

const pageStore = usePageStore()
const useStore = useEditorStore()
const canvasStyle = toRef(useStore.canvas)
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
