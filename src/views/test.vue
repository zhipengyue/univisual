<template>
    <div>
      <ul>
        <li draggable="true" v-for="(item, index) in items" :key="index" @dragstart="dragStart(item, index)" @dragover.prevent @drop="drop(item, index)">
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const items = ref(['苹果', '香蕉', '橘子']);
  
  let draggingItem;
  let draggingIndex;
  
  function dragStart(item, index) {
    draggingItem = item;
    draggingIndex = index;
  }
  
  function drop(item, targetIndex) {
       const [_item] = items.value.splice(draggingIndex,1)
        items.value.splice(targetIndex, 0, _item)
  }
  </script>
  
  <style scoped>
  li {
    padding: 10px;
    border: 1px solid #ccc;
    cursor: move;
  }
  </style>
  <style lang="scss">
  ul{
    li {
        user-select: none;
    }
  }
</style>