<template>
  <div class="recursion-select-container" ref="containerRef">
    <div class="select-path">
      <div
        class="path"
        v-for="(element, index) in pathNames"
        :key="index"
        @click="() => backPrevDeepHandle(index)"
      >
        {{ element }}
      </div>
    </div>
    <div class="scroll-container">
      <div
        class="list-container"
        :style="{
          width: `${width * deepPath.length}px`,
          transform: `translate(${currentDeep * width * -1}px,0)`
        }"
      >
        <element-list
          v-for="(element, index) in deepPath"
          :key="index"
          :rootElement="element"
          :deep="index"
          :name="'name'"
          @select="selectLayerHandle"
          @nextLevel="enterNextLevel"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, toRef, onMounted, type PropType, computed, nextTick, watch, getCurrentInstance } from 'vue'
import { BottomRight } from '@element-plus/icons-vue'
import { useEditorStore } from '@/stores/editor'
// import type { BaseComponentClassify, SecondaryComponentClassify, HtmlComponent, ElementComponent } from '@/types/component'
import ElementList from '../element-list/index.vue'
import type { Element } from '@/types/element'
const emit = defineEmits(['tabClick'])
const containerRef = ref()
const width = ref<number>(0)
const deepPath = ref<any[]>([])
const currentDeep = ref<number>(0)
const useStore = useEditorStore()
const pathNames = computed(() => deepPath.value.map((item) => item.name))
const props = defineProps({
  rootElement: {
    type: Object as PropType<Element>,
    default: null
  }
})
const instance = getCurrentInstance()
onMounted(() => {
  // 等待异步
  deepPath.value = [props.rootElement]
  width.value = containerRef.value.offsetWidth
})
watch(()=>props.rootElement,()=>{
  deepPath.value = null
  deepPath.value = [props.rootElement]
  nextTick(()=>{
    instance?.proxy?.$forceUpdate()
    console.log(instance)
  })
},{deep: true}) 
function selectLayerHandle(item: any) {
  useStore.setSelect(item)
}
function enterNextLevel(data: any) {
  const { item, deep } = data

  deepPath.value.push(item)
  nextTick(() => {
    movetoCurrentLayer(deep)
  })
}
function movetoCurrentLayer(deep: number) {
  currentDeep.value = deep + 1
}
function backPrevDeepHandle(_index: number) {
  currentDeep.value = _index
  deepPath.value.splice(_index + 1, deepPath.value.length - _index - 1)
}
</script>
<style lang="scss">
.recursion-select-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .select-path {
    max-width: 100%;
    white-space: nowrap;
    overflow-x: scroll;

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

    .path {
      display: inline-block;
      cursor: pointer;
      color: var(--eleven-cascade-text1-color);

      &::after {
        content: '>';
        padding-left: 2px;
        padding-right: 2px;
        color: rgba(255, 255, 255, 0.1);
      }

      &:last-child {
        color: var(--eleven-layer-path-color);

        &::after {
          content: '';
        }
      }
    }

    padding: 4px;
    border-bottom: 1px dashed var(--eleven-cascade-border-color1);
    box-sizing: border-box;
  }

  .scroll-container {
    position: relative;
    width: 100%;
    flex-grow: 1;

    .list-container {
      position: relative;
      display: flex;
      height: 100%;
      transition: all 0.2s ease-out;
    }
  }
}
</style>
