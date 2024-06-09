import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Page, PageStore } from '@/types/Page'
import { getPage } from '@/api/page'
import componentJson from '@/data/component.data.json'
import merge from 'lodash/merge'
import shortid from 'shortid'
export const usePageStore = defineStore('page', () => {
  // const page = ref<Page>({ name: '测试页面' })
  const state = reactive<PageStore>({
    pageData: null, // 创建页面前的准备数据
    page: null,// 当前页面
    pageMode: 'normal',
    playMode: 'editor' //view,
  })

  async function getPageInfo(pageId: string) {
    return new Promise(async (resolve, reject) => {
      const { data } = await getPage(pageId)
      if (data.code === 0) {
        const objData: any = merge({}, componentJson.page, data.data)
        state.pageData = objData
        // console.log(page.value)
        resolve(state.pageData)
      } else {
        reject('error')
      }
    })
  }
  function createPage() {
    const objData: any = merge({
      id: shortid.generate(),
      ...componentJson.page
    })
    state.pageData = objData
  }
  return {
    state,
    getPageInfo,
    createPage
  }
})
