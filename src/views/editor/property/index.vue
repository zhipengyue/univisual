<template>
  <div class="open-button-container" :class="{ show: !useStore.show }">
    <div class="tabs">
      <div v-for="tab in tabs" :key="tab.name" class="tab" :class="{'active':active.name==tab.name}" @click="()=>{tabClick(tab)}">
        <el-icon><GobletSquareFull /></el-icon>
        <div class="text">{{ tab.name }}</div>
      </div>
    </div>
    <div class="button" @mousedown="openHandle">
        <el-icon @click="$emit('close')">
          <ArrowLeftBold v-if="!useStore.show" class="arrow left"/>
          <ArrowRightBold v-if="useStore.show" class="arrow right" />
        </el-icon>
        <div class="text">{{ useStore.show?'close':'open' }}</div>
    </div>
  </div>
  <side-panel
    :title="'属性面板'"
    :width="300"
    :direction="'right'"
    :mode="closeMode.complete"
    :show="useStore.show"
    :hideTopBar="true"
    @close="closeHandle"
  >
    <facade-panel 
    v-if="active.type =='facade'&&editorStore.select"
    v-model="editorStore.select.style"
    ></facade-panel>
    <data-panel v-if="active.type =='data'"></data-panel>
    <motion-panel v-if="active.type =='motion'"></motion-panel>
  </side-panel>
</template>
<script lang="ts" setup>
import SidePanel from '@/components/ui/side-panel/index.vue'
import {ref} from 'vue'
import { ArrowLeftBold, ArrowRightBold,GobletSquareFull } from '@element-plus/icons-vue'
// import ElementContainer from './components/element-container/index.vue'
import { usePropertyStore } from '@/stores/property'
import { closeMode } from '@/dict/sidePanel'
import { useEventStore } from '@/stores/event'
import { useEditorStore} from '@/stores/editor'
import { tabs } from '@/data/property'
import facadePanel from './components/facade-panel.vue'
import dataPanel from './components/data-panel.vue'
import motionPanel from './components/motion-panel.vue'
const active = ref<any>(tabs[0])
const useStore = usePropertyStore()
const eventStore = useEventStore()
const editorStore = useEditorStore()
function closeHandle() {
  useStore.show = false
  setTimeout(() => {
    eventStore.triggerEvent('editor-resize', null)
  }, 300)
}
function openHandle() {
  useStore.show = !useStore.show
  setTimeout(() => {
    eventStore.triggerEvent('editor-resize', null)
  }, 300)
}
function tabClick(tab:any){
  active.value = tab
}
</script>
<style lang="scss" scoped>
.side-panel{
  z-index: 2;
}
.open-button-container {
  position: absolute;
  top: 0;
  right: 300px;
  width: 25px;
  height: 100%;
  .tabs{
    display: flex;
    flex-direction: column;
    .tab{
      color: #fff;
      font-size:12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      flex-wrap: wrap;
      padding:5px 0;
      background-color: #3e3e3e;
      cursor: pointer;
      user-select: none;
      &.active{
        background-color: var(--eleven-panel-bg-color2);
      }
      .text{
        white-space: wrap;
        width: 12px;
      }
    }
    width: 100%;;
    
  }
  .button {
    position: absolute;
    bottom: 5px;
    right: -40px;
    width: 60px;
    height: 20px;
    border-radius: 10px 0 0 10px;;
    cursor: pointer;
    background-color: #000;
    display: flex;
    align-items: center;
    padding:0px 5px;
    transition: all 0.2s ease;
    &:hover{
      right: -10px;
    }
    .text{
      height: 20px;
      line-height: 20px;
      font-size: 12px;
      color: var(--eleven-cascade-hover-bg2);
      font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      
    }
    //var(--eleven-cascade-hover-bg2)
    .arrow{
      color:var(--eleven-layer-text-disabled-color);
      font-size: 12px;
      &.right{

      }
    }
    .svg-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  z-index: 1;
  transition: all 0.2s ease;

  &.show {
    right: 0;
  }
}
</style>
