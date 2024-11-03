<template>
  <div
    class="side-panel"
    :style="{ width: props.width + 'px' }"
    :class="{
      'direction-right': props.direction == 'right',
      '--full-hide': !props.show && props.mode === closeMode.complete,
      '--hide': !props.show && props.mode == closeMode.partial
    }"
  >
    <div class="inner" :style="{ width: props.width + 'px' }">
      <div class="top-bar" v-if="!props.hideTopBar">
        <div class="title">{{ props.title }}</div>
        <div class="buttons" title="收起">
          <el-icon @click="$emit('close')">
            <ArrowLeftBold v-if="props.direction == 'left'" />
            <ArrowRightBold v-if="props.direction == 'right'" />
          </el-icon>
        </div>
      </div>
      <div class="container">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue'
import { closeMode, closeDirection } from '@/dict/sidePanel'
import { type PropType } from 'vue'

const emit = defineEmits(['close'])
const props = defineProps({
  width: {
    type: Number,
    default: 200
  },
  title: {
    type: String,
    default: '标题'
  },
  mode: {
    type: String as PropType<keyof typeof closeMode>,
    default: closeMode.complete
  },
  direction: {
    type: String as PropType<keyof typeof closeDirection>,
    default: closeDirection.left
  },
  show: {
    type: Boolean,
    default: true
  },
  hideTopBar: {
    type: Boolean,
    default: false
  }
})
</script>
<style lang="scss">
.side-panel {
  position: relative;
  height: 100%;
  transition: all 0.2s ease;
  background-color: var(--eleven-panel-bg-color2);
  border-right: var(--eleven-border1);
  box-sizing: border-box;
  overflow: hidden;

  &.--full-hide {
    width: 0 !important;

    .inner {
      transform: translateX(-100%);
    }
  }

  &.--hide {
    width: 50px !important;
    box-shadow: -10px 0 10px 0 var(--eleven-panel-shadow) inset;
  }

  &.direction-right {
    &.--full-hide {
      width: 0 !important;

      .inner {
        transform: translateX(100%);
      }
    }

    &.--full-hide {
      width: 0 !important;

      .inner {
        transform: translateX(100%);
      }
    }
  }

  .inner {
    position: relative;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease;
    display: flex;
    flex-direction: column;

    .top-bar {
      position: relative;
      width: 100%;
      height: 30px;
      display: flex;
      background-color: var(--eleven-panel-bg-color1);
      color: var(--eleven-panel-title-color1);
      font-size: 13px;
      align-items: center;
      justify-content: space-between;

      &.direction-right {
      }

      .title {
        padding-left: 4px;
      }

      .buttons {
        padding-right: 4px;

        .el-icon {
          cursor: pointer;
        }
      }
    }

    .container {
      position: relative;
      width: 100%;
      flex-grow: 1;
    }
  }
}
</style>
