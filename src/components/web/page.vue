<template>
  <!-- <page-select v-if="useStore.state.playMode == playMode.editor"> -->
  <div class="page" :style="style">
    <page-select v-if="useStore.state.playMode == playMode.editor"> </page-select>
  </div>
  <!-- </page-select> -->
</template>
<script lang="ts">
import pageSelect from '@/components/ui/page-select/index.vue'
import { toRef, getCurrentInstance } from 'vue'
import BaseContainer from './baseContainer/baseContainer'
import { usePageStore } from '@/stores/page'
import { useEditorStore } from '@/stores/editor'
import { playMode } from '@/dict/play'
// import baseContainerCom from './baseContainer/index.vue'
export default {
  name: 'page',
  // extends: BaseContainer,
  props: {
    ...BaseContainer.props
  },
  components: {
    pageSelect
  },
  setup(props) {
    const useStore = usePageStore()
    const editStore = useEditorStore()
    const baseProp = BaseContainer.setup(props)
    if (useStore.state.playMode == playMode.editor) {
      const instance = getCurrentInstance()
      editStore.select = {
        instance,
        ...baseProp
      }
    }

    return {
      ...baseProp,
      useStore,
      playMode
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
}
:deep(.svg-button .content) {
  padding: 0;
}
</style>
