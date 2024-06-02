<template>
  <drag-container v-if="useStore.createMode === prefabComponentCreateMode.drag"></drag-container>
  <click-container v-if="useStore.createMode === prefabComponentCreateMode.click"></click-container>
</template>
<script lang="ts" setup>
import clickContainer from './click.vue'
import dragContainer from './drag.vue'
import { useEditorStore } from '@/stores/editor'
import { prefabComponentCreateMode } from '@/dict/edit'
const useStore = useEditorStore()
</script>
