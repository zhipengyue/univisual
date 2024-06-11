import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Page, PageStore } from '@/types/Page'
import { getPage } from '@/api/page'
import componentJson from '@/data/component.data.json'
import merge from 'lodash/merge'
import shortid from 'shortid'
import {buildTree} from '@/utils/common'
import { useEventStore } from '@/stores/event'
export const usePageStore = defineStore('page', () => {
  // const page = ref<Page>({ name: '测试页面' })
  const state = reactive<PageStore>({
    pageData: null, // 创建页面前的准备数据
    page: null,// 当前页面
    pageMode: 'normal',
    playMode: 'editor' //view,
  })
  const eventStore = useEventStore()
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
  function exportJson() {
    // return state.page
    const jsonList:any[] = []
    loopGetChildJson(state.page,jsonList)
    return JSON.stringify(jsonList)
  }
  function importJson(json:string){
    const pageJson = JSON.parse(json)
    const [treeData] = buildTree(pageJson)
    state.page = treeData
    eventStore.triggerEvent('page-change', null)
  }
  function loopGetChildJson(item: any,list:any[]) {
    const _item:any = {...item}
    delete _item.methods
    delete _item.children
    list.push(_item)
    if(item.children){
      item.children.forEach((item:any)=>{
        loopGetChildJson(item,list)
      })
    }
  }
  return {
    state,
    getPageInfo,
    createPage,
    exportJson,
    importJson
  }
})
