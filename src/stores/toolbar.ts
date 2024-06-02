import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToolbarStore = defineStore('toolbar', () => {
  const loading = ref<number>(0)
  function addLoading() {
    loading.value++
  }
  function removeLoading() {
    loading.value--
    if (loading.value < 0) {
      throw new Error('loading 为负了，不可能出现的')
    }
  }
  return { loading, addLoading, removeLoading }
})
