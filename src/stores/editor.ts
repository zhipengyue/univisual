import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { prefabComponentCreateMode } from '@/dict/edit'
import componentJson from '@/data/component.data.json'
import { type SelecObject } from '@/types/editor'
import { getModules } from '@/components/common/methods'
export const useEditorStore = defineStore('editor', () => {
  const select = ref<SelecObject>()
  const state = reactive<any>({
    webModules: getModules(),
    createMode: prefabComponentCreateMode.click,
    // select: null, // 选择的元素
    canvas: {
      scale: 1,
      width: 1920,
      height: 1080,
      translateX: 0,
      translateY: 0,
      backgroundImage: `radial-gradient(at top left, #162574, #431674)`
    },
    guideLine: {
      h: [],
      v: []
    },
    alignLine: {
      enable: true,
      show: true,
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      vertical: 0,
      horizontal: 0
    },
    componentJson: componentJson
  })
  function getComponentJson(type: string) {
    return state.componentJson[type]
  }
  function setSelect(_select: any) {
    select.value = _select
  }
  function cancelSelect() {
    select.value = null
  }
  return {
    state,
    select,
    // createMode: state.createMode,
    // select: state.select,
    // canvas: state.canvas,
    // guideLine: state.guideLine,
    // alignLine: state.alignLine,
    setSelect,
    cancelSelect,
    getComponentJson
  }
})
