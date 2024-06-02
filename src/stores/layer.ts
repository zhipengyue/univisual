import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useLayerStore = defineStore('layer', () => {
  const state = reactive({
    show: true
  })
  return { show: state.show }
})
