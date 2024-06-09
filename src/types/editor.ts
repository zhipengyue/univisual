export type SelecObject = {
  id: string
  name: string
  childIds: string[]
  children: any[]
  style: any
  type: string
  methods?:{
    [key:string]: Function
  }
}
