<template>
  <div class="element-list">
    <div class="element-prev header" @click="elementClick(element, -1)">{{ element?.name }}</div>
    <div class="element-container">
      <TransitionGroup name="list" tag="div" class="contaienr">
      <div
        draggable="true"
        class="element"
        v-for="(item, index) in elementList"
        :key="item.id"
        :class="{ active: elementIndex === index }"
        @click="elementClick(item, index)"
        @dragstart="dragStart(item, index)" 
        @dragover.prevent 
        @drop="drop(item, index)"
      >
        <div class="text">{{ item[props.prop] }}<span class="id">{{item.id }}</span></div>
        <div
          class="button"
          v-if="item?.children && item?.children?.length > 0"
          @click="(event) => enterLayerHandle(event, item)"
        >
          选择
          <el-icon>
            <Right />
          </el-icon>
        </div>
      </div>
      </TransitionGroup>
    </div>
    <div class="element-prev footer" @click="elementClick(element, -1)">{{ element?.name }}</div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, ref, toRef, watch, type PropType } from 'vue'
import { BottomRight, Right } from '@element-plus/icons-vue'
import { useEditorStore } from '@/stores/editor'
import type { Element } from '@/types/element'
import { useEventStore } from '@/stores/event'
import type {
  BaseComponentClassify,
  SecondaryComponentClassify,
  HtmlComponent,
  ElementComponent
} from '@/types/component'
const useStore = useEditorStore()
const eventStore = useEventStore()
const elementIndex = ref<number>(-1)
const emit = defineEmits(['select', 'nextLevel'])
const props = defineProps({
  prop: {
    type: String,
    default: 'name'
  },
  rootElement: {
    type: Object as PropType<Element>,
    default: null
  },
  deep: {
    type: Number,
    default: 0
  }
})
const element = toRef<Element>(props?.rootElement)
const elementList = ref<any>([])

let draggingItem:any = null;
let draggingIndex:number = -1;
  
nextTick(() => {
  elementList.value = element.value?.children
})
watch(()=>props.rootElement,()=>{
  console.log('----')
  element.value = props.rootElement
  elementList.value = element.value?.children
},{deep:true})
function elementClick(item:any, _index:number) {
  elementIndex.value = _index
  emit('select', item)
}
function enterLayerHandle(event: any, item: any) {
  //event.stopPropagation()
  emit('nextLevel', { item, deep: props?.deep })
}
function dragStart(item:any, index:number) {
  draggingItem = item;
  draggingIndex = index;
}
  
function drop(item:any, targetIndex:number) {
    const [_item] = elementList.value.splice(draggingIndex,1)
    elementList.value.splice(targetIndex, 0, _item)
    eventStore.triggerEvent('component-sort', {
      id: props.rootElement?.id,
      children: elementList.value
    })
}
</script>
<style lang="scss">
.element-list {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: var(--eleven-cascade-bg1);
  border-right: 1px dashed var(--eleven-cascade-border-color1);
  display: flex;
  flex-direction: column;
  .element-prev {
    padding-left: 4px;
    height: 25px;
    line-height: 25px;
    color: var(--eleven-layer-text-disabled-color);
    user-select: none;

    &.header {
      border-bottom: 1px dashed var(--eleven-cascade-border-color1);
    }

    &.footer {
      border-top: 1px dashed var(--eleven-cascade-border-color1);
    }
  }

  .element-container {
    width: 100%;
    // flex-grow:unset;
    // height: calc(100% - 50px);
    max-height: calc(100vh - 190px); //168px
    overflow-y: scroll;
    .contaienr{
      .list-move,.list-enter-active,.list-leave-active{
        transition: all 0.5s ease;
      }
    }
    /* 整体滚动条样式 */
    &::-webkit-scrollbar {
      width: 3px;
      height: 2px;
    }

    /* 滚动条轨道颜色 */
    &::-webkit-scrollbar-track {
      background: transparent;
    }

    /* 滚动条滑块颜色 */
    &::-webkit-scrollbar-thumb {
      background: var(--eleven-layer-scroll-color);
    }
  }

  .element {
    cursor: pointer;
    overflow: hidden;
    position: relative;
    width: 100%;
    padding: 4px 10px 4px 20px;
    color: var(--eleven-cascade-text1-color);
    user-select: none;
    border-bottom: 1px dashed var(--eleven-cascade-border-color1);
    transition: all 0.3s ease;
    z-index: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name{

    }
    .button {
      font-size: var(--eleven-layer-item-select-font-size);
      transition: all 0.2s ease;
      transform: translate(-20px, 0);
      opacity: 0;
      position: relative;
      border-radius: 3px;
      padding: 1px 2px;

      &:hover {
        background-color: var(--eleven-cascade-hover-bg2);
      }
    }

    &.active {
      color: var(--eleven-cascade-hover-color1);

      &::after {
        width: 100%;
      }
      &:hover{
        &::after{
          background-color: #000;
          width: 100%;
        }
      }
      .button {
        transform: translate(0, 0);
        opacity: 1;
      }
    }

    .text {
      .id{
        color:rgba(255,255,255,0.2);
        font-size: 10px;
        margin-left: 4px;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      background-color: var(--eleven-layer-item-hover-color);
      transition: all 0.1s ease;
      z-index: -1;
    }

    &:hover {
      //background-color: var(--eleven-layer-item-hover-color);
      color: var(--eleven-cascade-hover-color1);

      &::after {
        width: 3px;
      }

      .button {
        transform: translate(0, 0);
        opacity: 1;
      }
    }
  }
}
</style>
