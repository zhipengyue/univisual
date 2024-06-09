<template>
  <div class="cascade-select-list">
    <div class="tab-container">
      <div
        class="tab-button"
        v-for="(item, index) in props.dataList"
        :key="index"
        :class="{ active: tabIndex === index }"
        @click="tabClick(item, index)"
      >
        {{ item[props.prop] }}
      </div>
    </div>
    <div class="tab-container secondary">
      <div
        class="tab-button"
        v-for="(item, index) in secondItems"
        :key="index"
        :class="{ active: secondaryIndex === index }"
        @click="secondClick(item, index)"
      >
        {{ item[props.prop] }}
      </div>
    </div>
    <div class="component-list">
      <div class="item" v-for="(item, index) in componentList" :key="index">
        <div class="text">
          {{ item[props.prop] }}
        </div>

        <div
          class="operation"
          v-if="useStore.state.createMode === prefabComponentCreateMode.click"
          :class="[useStore.state.createMode]"
          @click="() => clickHandle(item)"
        >
          添加
          <el-icon>
            <BottomRight />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef } from 'vue'
import { BottomRight } from '@element-plus/icons-vue'
import { useEditorStore } from '@/stores/editor'
import { prefabComponentCreateMode } from '@/dict/edit'
import type {
  BaseComponentClassify,
  SecondaryComponentClassify,
  HtmlComponent,
  ElementComponent
} from '@/types/component'
const useStore = useEditorStore()
const tabIndex = ref<number>(0)
const secondaryIndex = ref<number>(0)
const emit = defineEmits(['tabClick'])
const props = defineProps({
  prop: {
    type: String,
    default: 'name'
  },
  dataList: {
    type: Array<BaseComponentClassify>,
    default: []
  }
})
const dataList = toRef<BaseComponentClassify[]>(props.dataList)
const secondItems = ref<SecondaryComponentClassify[]>(dataList.value[0]?.children || [])
const componentList = ref<HtmlComponent[] | ElementComponent[]>(
  secondItems.value[0]?.children || []
)
function tabClick(item: BaseComponentClassify, index: number) {
  tabIndex.value = index
  secondaryIndex.value = 0
  secondItems.value = item.children
  emit('tabClick', null)
}
function secondClick(item: SecondaryComponentClassify, index: number) {
  secondaryIndex.value = index
  componentList.value = item.children
}
function clickHandle(item: any) {
  useStore.select?.methods?.addChild(item)
}
</script>
<style lang="scss">
.cascade-select-list {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;

  .component-list {
    flex-grow: 1;
    max-height: 100%;
    overflow-y: scroll;
    background-color: var(--eleven-cascade-bg1);
    border-right: 1px dashed var(--eleven-cascade-border-color1);
    /* 整体滚动条样式 */
    &::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }

    /* 滚动条轨道颜色 */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* 滚动条滑块颜色 */
    &::-webkit-scrollbar-thumb {
      background: var(--eleven-layer-path-color);
    }
    .item {
      cursor: pointer;
      overflow: hidden;
      position: relative;
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      color: var(--eleven-cascade-text1-color);
      user-select: none;
      border-bottom: 1px dashed var(--eleven-cascade-border-color1);

      .text {
        position: absolute;
        top: 0;
        left: 20px;
        width: calc(100% - 20px);
        height: 100%;
        z-index: 1;
      }

      .operation {
        position: absolute;
        top: 0;
        right: 0px;
        width: 50px;
        height: 100%;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        cursor: pointer;

        &.click {
          transition: all 0.2s ease;
          transform: translate(-10px, 0);
          opacity: 0;

          .el-icon {
            color: var(--eleven-cascade-hover-bg1);
          }
        }
      }

      &::after {
        content: '';
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        right: -100%;
        background-color: var(--eleven-cascade-hover-bg3);
        transition: all 0.2s ease;
      }

      &:hover {
        color: var(--eleven-cascade-hover-bg1);

        &::after {
          right: 0;
        }

        .operation {
          &.click {
            transition: all 0.2s ease;
            transform: translate(0, 0);
            opacity: 1;

            .el-icon {
              color: var(--eleven-cascade-hover-bg1);
            }
          }
        }
      }
    }
  }

  .tab-container {
    width: 50px;
    height: 100%;
    background-color: var(--eleven-cascade-bg1);
    border-right: 1px dashed var(--eleven-cascade-border-color1);

    &.secondary {
      width: 80px;
      box-shadow: 10px 0 20px 0 var(--eleven-panel-shadow) inset;

      .tab-button {
        width: 80px;

        &::after {
          background-color: var(--eleven-cascade-hover-bg2);
        }

        &.active {
          &::after {
            background-color: var(--eleven-cascade-hover-bg2);
          }
        }
      }
    }

    .tab-button {
      position: relative;
      width: 50px;
      height: 50px;
      color: var(--eleven-cascade-text1-color);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      border-bottom: 1px dashed var(--eleven-cascade-border-color1);
      overflow: hidden;
      z-index: 0;

      &::after {
        content: '';
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -3px;
        background-color: var(--eleven-cascade-hover-bg1);
        transition: all 0.2s ease;
      }

      &:hover {
        &::after {
          content: '';
          width: 3px;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--eleven-cascade-hover-bg1);
          transition: all 0.2s ease;
        }
      }

      &.active {
        color: var(--eleven-cascade-hover-color1);

        &::after {
          content: '';
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          background-color: var(--eleven-cascade-hover-bg1);
          transition: all 0.2s ease;
          z-index: -1;
        }
      }

      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
