<template>
  <side-panel
    :title="'图层'"
    :width="200"
    :mode="closeMode.complete"
    :show="layerStore.show"
    @close="closeHandle"
  >
    <element-container :rootElement="element" />
  </side-panel>
</template>
<script lang="ts" setup>
import SidePanel from '@/components/ui/side-panel/index.vue'
import ElementContainer from './components/element-container/index.vue'
import { useLayerStore } from '@/stores/layer'
import { closeMode } from '@/dict/sidePanel'
import { element } from '@/data/prefab-conponent'
import { useEventStore } from '@/stores/event'
const eventStore = useEventStore()
const layerStore = useLayerStore()
function closeHandle() {
  layerStore.show = false
  setTimeout(() => {
    eventStore.triggerEvent('editor-resize', null)
  }, 300)
}
</script>
