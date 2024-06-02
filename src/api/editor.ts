import axios from 'axios'

export async function getProjectData(comId: string, comPath: string) {
  return axios.get(`/data/${comPath}.json?comId=${comId}`)
}
