<template>
  <div class="ident-line-wp" v-if="alignLine.enable && alignLine.show">
    <div class="ident-line x-line" :style="{ width: `${canvas.width}px`, top: `${alignLine.top}px` }"></div>
    <div class="ident-line x-line" :style="{ width: `${canvas.width}px`, top: `${alignLine.horizontal}px` }"></div>
    <div class="ident-line x-line" :style="{ width: `${canvas.width}px`, top: `${alignLine.bottom}px` }"></div>
    <div class="ident-line y-line" :style="{ height: `${canvas.height}px`, left: `${alignLine.left}px` }"></div>
    <div class="ident-line y-line" :style="{ height: `${canvas.height}px`, left: `${alignLine.vertical}px` }"></div>
    <div class="ident-line y-line" :style="{ height: `${canvas.height}px`, left: `${alignLine.right}px` }"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useEditorStore } from '@/stores/editor'

export default defineComponent({
  name: 'AlignLine',
  setup() {
    const editorStore = useEditorStore()

    return {
      alignLine: computed(() => editorStore.alignLine),
      canvas: computed(() => editorStore.canvas),
    }
  },
})
</script>

<style lang="scss" scoped>
.ident-line-wp {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

.x-line {
  height: 1px;
  border-top: 1px dashed var(--datav-sort-line-border-color);
}

.y-line {
  width: 1px;
  border-left: 1px dashed var(--datav-sort-line-border-color);
}
</style>
