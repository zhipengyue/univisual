<template>
  <div class="editor">
    <TopBar />
    <div class="main">
      <Layer />
      <ComponentList />
      <EditorMain />
      <Property />
    </div>
    <Footbar />
  </div>
</template>
<script lang="ts" setup>
import TopBar from './topbar/index.vue'
import Layer from './layer/index.vue'
import ComponentList from './prefab-components/index.vue'
import EditorMain from './editor-main/index.vue'
import Property from './property/index.vue'
import Footbar from './footbar/index.vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { usePageStore } from '@/stores/page'
import { onMounted } from 'vue'
const projectStore = useProjectStore()
const pageStore = usePageStore()
const route = useRoute()
// 获取具体参数
const id: any = route.query.id

onMounted(async () => {
  if (!id) {
    pageStore.createPage()
    return
  }
  const project: any = await projectStore.loadProjectById(id)
  const [firstPageId] = project.pages
  if (firstPageId) {
    pageStore.getPageInfo(firstPageId)
  } else {
    // 没有创建页面数据
    pageStore.createPage()
  }
})
</script>
<style lang="scss" scoped>
.editor {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .main {
    position: relative;
    width: 100%;
    height: calc(100vh - 41px - 34px);
    display: flex;
    background-color: black;
    overflow: hidden;
  }
}
</style>
