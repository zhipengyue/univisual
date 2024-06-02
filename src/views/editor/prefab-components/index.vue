<template>
    <div class="prefab">
        <side-panel :title="useStore.show ? '组件列表' : '组件'" :width="300" :mode="closeMode.partial" :show="useStore.show"
            @close="useStore.show = false">
            <cascade-select-list :prop="'name'" :dataList="prefabComponents" @tab-click="useStore.show = true" />
        </side-panel>
    </div>
</template>
<script lang="ts" setup>
import SidePanel from '@/components/ui/side-panel/index.vue'
import { usePrefabStore } from '@/stores/prefab-component'
import { closeMode } from '@/dict/sidePanel'
import { prefabComponents } from '@/data/prefab-conponent'
import CascadeSelectList from './components/cascade-select-list/index.vue'
const useStore = usePrefabStore()
</script>
<style lang="scss">
.prefab {
    // margin-left: 1px;
}
</style>
