<template>
  <div class="zoom-container">
    <el-slider v-model="useStore.state.canvas.scale" :min="0.2" :max="2" :step="0.1" />
    <div class="scale-text">scale: {{ useStore.state.canvas.scale }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useEditorStore } from '@/stores/editor'
const useStore = useEditorStore()
</script>
<style lang="scss">
.zoom-container {
  width: 160px;
  display: flex;
  .el-slider__button-wrapper {
    height: 32px;
  }
  .el-slider__button {
    width: 10px;
    height: 10px;
    border: none;
  }
  .el-slider__runway {
    height: 2px;
    background-color: var(--eleven-button-border-dark);
    .el-slider__bar {
      background-color: var(--eleven-button-border-green);
      height: 2px;
    }
  }
  .scale-text {
    width: 80px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: var(--eleven-cascade-text1-color);
    margin-left: 10px;
  }
}
</style>
