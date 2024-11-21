import {
  CreateProjectDto,
  CreateSubjectDto,
  CreateProjectApiResponse,
  SubjectApiResponse,
  DeleteApiResponse,
  UpdateProjectDto,
  UpdateSubjectDto,
  ProjectApiResponse,
  CreateQuestionsDto,
  QuestionsApiResponse,
  EvaluationData,
  EvaluationApiResponse,
  Project,
  Questions,
  Subject,
  ExcelResponse,
} from '@/utils/interface'
import axios from 'axios'
import { ReactNode, createContext, useState, useEffect } from 'react'

const BACKEND_URL = 'https://peuta.up.railway.app'

type BackendContextType = {
  /** Subjects **/
  getSubjects: () => Promise<Subject>
  createSubject: (
    createSubjectDto: CreateSubjectDto
  ) => Promise<SubjectApiResponse>
  updateSubject: (
    id: string,
    updateSubjectDto: UpdateSubjectDto
  ) => Promise<SubjectApiResponse>
  deleteSubject: (id: string) => Promise<DeleteApiResponse>
  /** Projects **/
  getProjects: () => Promise<Project>
  getProjectById: (id: string) => Promise<ProjectApiResponse>
  createProject: (
    createProjectDto: CreateProjectDto
  ) => Promise<CreateProjectApiResponse>
  updateProject: (
    id: string,
    updateProjectDto: UpdateProjectDto
  ) => Promise<CreateProjectApiResponse>
  deleteProject: (id: string) => Promise<DeleteApiResponse>
  /** Questions **/
  getQuestions: () => Promise<Questions>
  createQuestion: (
    createQuestionDto: CreateQuestionsDto
  ) => Promise<QuestionsApiResponse>
  deleteQuestion: (id: string) => Promise<DeleteApiResponse>
  /** Evaluation **/
  getEvaluations: () => Promise<EvaluationApiResponse>
  getEvaluationsByUser: (id: string) => Promise<EvaluationApiResponse>
  submitEvaluation: (
    createEvaluation: EvaluationData
  ) => Promise<EvaluationApiResponse>
  /** Export Excel **/
  exportExcel: () => Promise<ExcelResponse>
}

type BackendProviderProps = {
  children: ReactNode
}

export const BackendContext = createContext<BackendContextType | undefined>(
  undefined
)

export const BackendProvider = ({ children }: BackendProviderProps) => {
  const [cachedSubjects, setCachedSubjects] = useState<SubjectApiResponse>(null)
  const [cachedProjects, setCachedProjects] = useState<Project[]>([])
  const [cachedQuestions, setCachedQuestions] = useState<Questions[]>([])
  const [cacheTimestamps, setCacheTimestamps] = useState<
    Record<string, number>
  >({})

  useEffect(() => {
    const storedSubjects = localStorage.getItem('subjectsCache')
    const storedProjects = localStorage.getItem('projectsCache')
    const storedQuestions = localStorage.getItem('questionsCache')
    const storedTimestamps = localStorage.getItem('backendCacheTimestamps')

    if (storedSubjects) setCachedSubjects(JSON.parse(storedSubjects))
    if (storedProjects) setCachedProjects(JSON.parse(storedProjects))
    if (storedQuestions) setCachedQuestions(JSON.parse(storedQuestions))
    if (storedTimestamps) setCacheTimestamps(JSON.parse(storedTimestamps))
  }, [])

  useEffect(() => {
    localStorage.setItem('subjectsCache', JSON.stringify(cachedSubjects))
    localStorage.setItem('projectsCache', JSON.stringify(cachedProjects))
    localStorage.setItem('questionsCache', JSON.stringify(cachedQuestions))
    localStorage.setItem(
      'backendCacheTimestamps',
      JSON.stringify(cacheTimestamps)
    )
  }, [cachedSubjects, cachedProjects, cachedQuestions, cacheTimestamps])

  /** Subjects functions **/
  const getSubjects = () => {
    return fetchExpoData('subjects')
  }
  const createSubject = (createSubjectDto: CreateSubjectDto) =>
    axios.post(`${BACKEND_URL}/api/subjects`, createSubjectDto)
  const updateSubject = (id: string, updateSubjectDto: UpdateSubjectDto) =>
    axios.put(`${BACKEND_URL}/api/subjects/${id}`, updateSubjectDto)
  const deleteSubject = (id: string) =>
    axios.delete(`${BACKEND_URL}/api/subjects/${id}`)

  /** Projects functions **/
  const getProjects = () => {
    return fetchExpoData('projects')
  }
  const getProjectById = (id: string) =>
    axios.get(`${BACKEND_URL}/api/projects/${id}`).then((res) => res.data)
  const createProject = (createProjectDto: CreateProjectDto) =>
    axios.post(`${BACKEND_URL}/api/projects`, createProjectDto)
  const updateProject = (id: string, updateProjectDto: UpdateProjectDto) =>
    axios.put(`${BACKEND_URL}/api/projects/${id}`, updateProjectDto)
  const deleteProject = (id: string) =>
    axios.delete(`${BACKEND_URL}/api/projects/${id}`)

  /** Questions functions **/
  const getQuestions = () => {
    return fetchExpoData('questions')
  }
  const createQuestion = (createQuestionDto: CreateQuestionsDto) =>
    axios.post(`${BACKEND_URL}/api/questions`, createQuestionDto)
  const deleteQuestion = (id: string) =>
    axios.delete(`${BACKEND_URL}/api/questions/${id}`)

  /** Evaluation functions **/
  const getEvaluations = () => {
    return fetchExpoData('evaluations')
  }
  const getEvaluationsByUser = (id: string) =>
    axios.get(`${BACKEND_URL}/api/evaluations/user/${id}`).then((res) => res.data)
  const submitEvaluation = (createEvaluation: EvaluationData) =>
    axios.post(`${BACKEND_URL}/api/evaluations`, createEvaluation)

  /** Export Excel **/
  const exportExcel = (): Promise<ExcelResponse> => axios.get(`${BACKEND_URL}/api/export/xls`, { responseType: 'blob'})


  const fetchExpoData = async (type: string) => {
    const now = Date.now()
    const cacheKey = `${type}Timestamp`

    if (
      cacheTimestamps[cacheKey] &&
      now - cacheTimestamps[cacheKey] < 10 * 60 * 1000
    ) {
      if (type === 'projects') return cachedProjects
      if (type === 'subjects') return cachedSubjects
      if (type === 'questions') return cachedQuestions
    }

    try {
      let expoEndpoint = `${BACKEND_URL}/api/`

      switch (type) {
        case 'projects':
          expoEndpoint += 'projects'
          break
        case 'subjects':
          expoEndpoint += 'subjects'
          break
        case 'questions':
          expoEndpoint += 'questions'
          break
        default:
          return []
      }

      const response = await axios.get(expoEndpoint)
      const { data } = response
      if (type === 'projects') {
        setCachedProjects(data)
      } else if (type === 'subjects') {
        setCachedSubjects(data)
      } else if (type === 'questions') {
        setCachedQuestions(data)
      }

      setCacheTimestamps((prev) => ({ ...prev, [cacheKey]: now }))

      return data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        console.error('Too Many Requests, retrying in 30 seconds...')
        await new Promise((resolve) => setTimeout(resolve, 30000))
        return fetchExpoData(type)
      }

      console.error(`Failed to fetch ${type} data:`, error)
      return []
    }
  }

  return (
    <BackendContext.Provider
      value={{
        getSubjects,
        createSubject,
        updateSubject,
        deleteSubject,
        getProjects,
        getProjectById,
        createProject,
        updateProject,
        deleteProject,
        getQuestions,
        createQuestion,
        deleteQuestion,
        getEvaluations,
        getEvaluationsByUser,
        submitEvaluation,
        exportExcel
      }}
    >
      {children}
    </BackendContext.Provider>
  )
}
