<template>
  <div class="prefab">
    <side-panel
      :title="useStore.show ? '组件列表' : '组件'"
      :width="300"
      :mode="closeMode.partial"
      :show="useStore.show"
      @close="closeHandle"
    >
      <cascade-select-list :prop="'name'" :dataList="prefabComponents" @tab-click="openHandle" />
    </side-panel>
  </div>
</template>
<script lang="ts" setup>
import SidePanel from '@/components/ui/side-panel/index.vue'
import { usePrefabStore } from '@/stores/prefab-component'
import { closeMode } from '@/dict/sidePanel'
import { prefabComponents } from '@/data/prefab-conponent'
import CascadeSelectList from './components/cascade-select-list/index.vue'
import { useEventStore } from '@/stores/event'
const eventStore = useEventStore()
const useStore = usePrefabStore()
function closeHandle() {
  useStore.show = false
  setTimeout(() => {
    eventStore.triggerEvent('editor-resize', null)
  }, 300)
}
function openHandle() {
  useStore.show = true
  setTimeout(() => {
    eventStore.triggerEvent('editor-resize', null)
  }, 300)
}
</script>
<style lang="scss">
.prefab {
  // margin-left: 1px;
}
</style>
