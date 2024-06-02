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
      <div class="title">{{ useStore.page?.name || '' }}</div>
      <div class="buttons right"></div>
    </div>
    <head-loading />
  </div>
</template>
<script lang="ts" setup>
import headLoading from './head-loading.vue'
import { usePageStore } from '@/stores/page'
import iconButton from '@/components/ui/icon-button/index.vue'
import svgButton from '@/components/ui/svg-button/index.vue'
import { IconLayer, IconViewList } from '@/components/icons'
import { useLayerStore } from '@/stores/layer'
import { usePrefabStore } from '@/stores/prefab-component'
const useStore = usePageStore()
const layerStore = useLayerStore()
const prefabStore = usePrefabStore()
const toggleLayer = () => {
  layerStore.show = !layerStore.show
}
const togglePrefab = () => {
  prefabStore.show = !prefabStore.show
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
