import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePrefabStore = defineStore('prefab', () => {
  const state = reactive({
    show: true
  })
  return { show: state.show }
})
