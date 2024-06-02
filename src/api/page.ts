import request from '@/utils/request'

export function getPage(id: any) {
  return request.get(`/page/${id}`)
}
