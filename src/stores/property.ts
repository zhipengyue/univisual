import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePropertyStore = defineStore('property', () => {
  const state = reactive({
    show: true
  })
  return { show: state.show }
})
