<template>
  <!-- <page-select v-if="useStore.state.playMode == playMode.editor"> -->
  <div class="page" :style="style" @click="selectThis">
    <page-select v-if="editStore.state?.select?.instance===instance&&useStore.state.playMode == playMode.editor"> </page-select>
    <!-- <div v-for="(item,index) in children" :key="index">{{item.name}}</div> -->
    <component v-for="(item,index) in children" :key="index" :is="item"/>
  </div>
  <!-- </page-select> -->
</template>
<script lang="ts">
import pageSelect from '@/components/ui/page-select/index.vue'
import { toRef, ref,getCurrentInstance } from 'vue'
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
    const instance = ref<any>(null)
    if (useStore.state.playMode == playMode.editor) {
      instance.value = getCurrentInstance()
      editStore.setSelect({
        instance,
        ...baseProp
      })
    }
    function selectThis() {
      console.log('page')
      editStore.setSelect({
        instance,
        ...baseProp
      })
    }
    return {
      ...baseProp,
      editStore,
      instance,
      selectThis,
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
