<template>
  <div class="div"></div>
</template>
<script lang="ts">
import { toRef } from 'vue'
import BaseContainer from './baseContainer/baseContainer'
export default {
  name: 'div',
  extends: BaseContainer,
  props: {},
  setup(props) {
    console.log(props)

    return {}
  }
}
</script>
<style lang="scss"></style>
