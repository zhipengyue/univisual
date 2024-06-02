import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Page } from '@/types/Page'
import { getPage } from '@/api/page'
import componentJson from '@/data/component.data.json'
import merge from 'lodash/merge'
import shortid from 'shortid'
export const usePageStore = defineStore('page', () => {
  // const page = ref<Page>({ name: '测试页面' })
  const page = ref<any>(null)
  const state = reactive({
    pageMode: 'normal',
    playMode: 'editor' //view,
  })

  async function getPageInfo(pageId: string) {
    return new Promise(async (resolve, reject) => {
      const { data } = await getPage(pageId)
      if (data.code === 0) {
        const objData: any = merge({}, componentJson.page, data.data)
        page.value = objData
        // console.log(page.value)
        resolve(page.value)
      } else {
        reject('error')
      }
    })
  }
  function createPage() {
    const objData: any = merge(
      {
        id: shortid.generate()
      },
      componentJson.page
    )
    console.log(objData)
    page.value = objData
  }
  return {
    state,
    page: page,
    getPageInfo,
    createPage
  }
})
