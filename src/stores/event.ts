import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { type ELEventManage } from '@/types/event'
export const useEventStore = defineStore('event', () => {
  const state = reactive<ELEventManage>({
    eventList: {},
    intervalTime: null
  })
  // 添加侦听事件
  function addEvent(eventName: string, targetId: string, handler: Function) {
    if (!state.eventList[eventName]) {
      state.eventList[eventName] = {}
    }
    state.eventList[eventName][targetId] = handler
  }
  function removeEvent(eventName: string, targetId: string) {
    if (state.eventList[eventName]) {
      delete state.eventList[eventName][targetId]
    }
  }
  function triggerEvent(eventName: string, params: any) {
    if (state.eventList[eventName]) {
      Object.keys(state.eventList[eventName]).forEach((targetId) => {
        state.eventList[eventName][targetId](params)
      })
    }
  }
  function intervalTrigger(interval: number, handler: Function) {
    if (state.intervalTime) {
      clearTimeout(state.intervalTime)
    }
    state.intervalTime = setInterval(handler, 5)
    setTimeout(() => {
      clearInterval(state.intervalTime)
    }, interval)
  }
  return {
    state,
    addEvent,
    removeEvent,
    triggerEvent,
    intervalTrigger
  }
})
