import request from '@/utils/request'

export function getProject(id: any) {
  return request.get(`/project/${id}`)
}
