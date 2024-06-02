<template>
  <div class="base-container" @drop="dropHandle" @dragover="allowDrop"></div>
</template>
<script lang="ts" setup>
function dropHandle(event: any) {
  const componentDataStr: string = event.dataTransfer.getData('componentType')
  const componentData: any = JSON.parse(componentDataStr)
  // 创建初始信息
  // const data = GenerateComBaseInfo(componentData)
  // console.log(data)
  // componentsData.value.push(data)
}
function allowDrop(event: any) {
  event.preventDefault()
}
</script>
<style lang="scss"></style>
