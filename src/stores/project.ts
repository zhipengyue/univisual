import { ref, reactive, type PropType } from 'vue'
import { defineStore } from 'pinia'
import { getProject } from '@/api/project'
import { type Project } from '@/types/project'
type ProjectType = {
  currentProject: PropType<Project> | any
  projectList: any[]
}
export const useProjectStore = defineStore('project', () => {
  const state = reactive<ProjectType>({
    currentProject: null,
    projectList: []
  })

  async function loadProjectById(projectId: string) {
    return new Promise(async (resolve, reject) => {
      const { data } = await getProject(projectId)
      console.log(data)
      if (data.code === 0) {
        state.currentProject = data.data
        console.log(state.currentProject.name)
        resolve(data.data)
      } else {
        reject('error')
      }
    })
  }
  return { currentProject: state.currentProject, projectList: state.projectList, loadProjectById }
})
