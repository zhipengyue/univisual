<template>
  <div class="base-container" :style="style"></div>
</template>
<script lang="ts">
import { toRef } from 'vue'
import { baseProps } from '../baseProps/base'
import { containerProps } from '../baseProps/container'
export default {
  name: 'clickContainer',
  props: {
    ...baseProps,
    ...containerProps
  },
  setup(props) {
    const chidlren = toRef<Array<any>>(props.children)
    const addChild = (child: any) => {
      chidlren.value.push(child)
    }
    const removeChild = (child: any) => {
      chidlren.value.splice(chidlren.value.indexOf(child), 1)
    }
    return { ...props, chidlren, addChild, removeChild }
  }
}
</script>
<style lang="scss"></style>
