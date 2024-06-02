import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { prefabComponentCreateMode } from '@/dict/edit'
import componentJson from '@/data/component.data.json'
export const useEditorStore = defineStore('editor', () => {
  const state = reactive<any>({
    createMode: prefabComponentCreateMode.click,
    select: null, // 选择的元素
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
  return {
    createMode: state.createMode,
    select: state.select,
    canvas: state.canvas,
    guideLine: state.guideLine,
    alignLine: state.alignLine,
    setSelect: (select: any) => (state.select = select),
    getComponentJson
  }
})
