<template>
  <div class="topbar">
    <div class="content">
      <div class="buttons left">
        <icon-button :width="70" @click="toggleLayer">
          <template #icon>
            <IconLayer />
          </template>
          图层
        </icon-button>
        <icon-button :width="70" @click="togglePrefab">
          <template #icon>
            <IconViewList />
          </template>
          元件
        </icon-button>

        <svg-button :height="29.5" :radius="5"> abc </svg-button>
      </div>
      <div class="title">{{ useStore?.state?.page?.name || '' }}</div>
      <div class="buttons right">
        <el-dropdown class="dark">
          <icon-button :width="70">
            <template #icon>
              <IconSave />
            </template>
            保存
          </icon-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item :icon="Upload" @click="exportHandle">导出</el-dropdown-item>
              <el-dropdown-item :icon="Download" @click="importHandle">导入</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </div>
    </div>
    <head-loading />
  </div>
</template>
<script lang="ts" setup>
import headLoading from './head-loading.vue'
import { usePageStore } from '@/stores/page'
import iconButton from '@/components/ui/icon-button/index.vue'
import svgButton from '@/components/ui/svg-button/index.vue'
import { IconLayer, IconViewList, IconSave } from '@/components/icons'
import { useLayerStore } from '@/stores/layer'
import { usePrefabStore } from '@/stores/prefab-component'
import { useEventStore } from '@/stores/event'
import { Upload, Download } from '@element-plus/icons-vue'
import {exportJson,browseFile} from '@/utils/common'
const useStore = usePageStore()
const layerStore = useLayerStore()
const prefabStore = usePrefabStore()
const eventStore = useEventStore()
const toggleLayer = () => {
  layerStore.show = !layerStore.show
  setTimeout(() => {
    eventStore.triggerEvent('editor-resize', null)
  }, 300)
}
const togglePrefab = () => {
  prefabStore.show = !prefabStore.show
  setTimeout(() => {
    eventStore.triggerEvent('editor-resize', null)
  }, 300)
}

function exportHandle() {
  const pageJson =useStore.exportJson()
  exportJson(pageJson,'page.json')
}
function importHandle() {
  browseFile().then((res)=>{
    console.log(typeof(res))
    useStore.importJson(res)
  })
}
</script>
<style lang="scss" scoped>
.topbar {
  position: relative;
  height: 41px;
  width: 100vw;
  background-color: var(--eleven-panel-bg-color1);
  border-bottom: var(--eleven-border1);

  .content {
    width: 100vw;
    height: 40px;
    padding: 0 16px;
    display: flex;
    justify-content: center;
    align-items: center;

    .buttons {
      display: flex;
      align-items: center;
      width: 30%;

      &.left {
        justify-content: left;
      }

      &.right {
        justify-content: right;
      }
    }

    .title {
      text-align: center;
      color: var(--eleven-font-color2);
      flex-grow: 1;
    }
  }
}
</style>
