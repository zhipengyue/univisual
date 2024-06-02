<template>
  <div class="footbar">
    <div class="layer-info" v-if="layerStore.show"></div>
    <div class="component-info" v-if="useStore.show"></div>
    <div class="main-info">
      <zoom-com></zoom-com>
    </div>
    <div class="property-info" v-if="propertyStore.show"></div>
  </div>
</template>
<script lang="ts" setup>
import { useLayerStore } from '@/stores/layer'
import { usePrefabStore } from '@/stores/prefab-component'
import { usePropertyStore } from '@/stores/property'
import zoomCom from './zoom/index.vue'
const propertyStore = usePropertyStore()
const useStore = usePrefabStore()
const layerStore = useLayerStore()
</script>
<style lang="scss" scoped>
.footbar {
  position: relative;
  //   bottom: 0;
  height: 30px;
  width: 100vw;
  background-color: var(--eleven-panel-bg-color1);
  border-top: var(--eleven-border1);
  z-index: 10;
  display: flex;

  .layer-info {
    width: 200px;
  }

  .component-info {
    width: 300px;
  }
  .main-info {
    flex-grow: 1;
    display: flex;
  }
  .property-info {
    width: 300px;
  }
}
</style>
