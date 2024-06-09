import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Page, pageStore } from '@/types/Page'
import { getPage } from '@/api/page'
import componentJson from '@/data/component.data.json'
import merge from 'lodash/merge'
import shortid from 'shortid'
export const usePageStore = defineStore('page', () => {
  // const page = ref<Page>({ name: '测试页面' })
  const state = reactive<pageStore>({
    page: null,
    pageMode: 'normal',
    playMode: 'editor' //view,
  })

  async function getPageInfo(pageId: string) {
    return new Promise(async (resolve, reject) => {
      const { data } = await getPage(pageId)
      if (data.code === 0) {
        const objData: any = merge({}, componentJson.page, data.data)
        state.page = objData
        // console.log(page.value)
        resolve(state.page)
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
    state.page = objData
  }
  return {
    state,
    getPageInfo,
    createPage
  }
})
