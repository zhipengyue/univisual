export type ELEvent = {
  target: string
  handler: Function
}
export type ELEventManage = {
  eventList: {
    [key: string]: {
      [key: string]: Function
    }
  }
  [key: string]: any
}
