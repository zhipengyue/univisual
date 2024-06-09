import { type PropType, ref } from 'vue'
export function getComponentJson(intance: any) {
  return intance['componentJsonData']
}
export function getComponetNameByPath(path: string) {
  const arr = path.split('/')
  return arr[1] + '-' + arr[2]
}
export async function importComponent(path: string) {
  return await import(`${path}`)
}
export function getModules() {
  const modules = import.meta.glob('../web/**/index.vue')
  return modules
}
