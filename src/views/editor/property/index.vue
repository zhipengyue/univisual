<template>
  <side-panel
    :title="'属性面板'"
    :width="300"
    :direction="'right'"
    :mode="closeMode.complete"
    :show="useStore.show"
    @close="closeHandle"
  >
  </side-panel>
  <div class="open-button-container" :class="{ show: !useStore.show }" @mousedown="openHandle">
    <div class="button">
      <svg-button :height="100" :radius="0">
        <el-icon>
          <CaretLeft />
        </el-icon>
      </svg-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CaretLeft } from '@element-plus/icons-vue'
import SidePanel from '@/components/ui/side-panel/index.vue'
// import ElementContainer from './components/element-container/index.vue'
import { usePropertyStore } from '@/stores/property'
import { closeMode } from '@/dict/sidePanel'
import svgButton from '@/components/ui/svg-button/index.vue'
import { useEventStore } from '@/stores/event'
const useStore = usePropertyStore()
const eventStore = useEventStore()

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
<style lang="scss" scoped>
.open-button-container {
  position: absolute;
  top: 0;
  right: -30px;
  width: 20px;
  height: 100%;

  .button {
    position: absolute;
    top: 50%;
    right: 0;
    width: 20px;
    transform: translate(0, -50%);
    height: 100px;
    cursor: pointer;
    background-color: #000;

    .svg-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  z-index: 10;
  transition: all 0.2s ease;

  &.show {
    right: 0;
  }
}
</style>
