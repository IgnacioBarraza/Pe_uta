import { CreateProjectDto, CreateSubjectDto, CreateProjectApiResponse, SubjectApiResponse, DeleteApiResponse, UpdateProjectDto, UpdateSubjectDto, ProjectApiResponse, CreateQuestionsDto, QuestionsApiResponse, EvaluationData, EvaluationApiResponse } from "@/utils/utils";
import axios from "axios"
import { ReactNode, createContext } from "react";

const BACKEND_URL = 'https://peuta.up.railway.app'

type BackendContextType = {
  /** Subjects **/
  getSubjects: () => Promise<SubjectApiResponse>;
  createSubject: (createSubjectDto: CreateSubjectDto) => Promise<SubjectApiResponse>;
  updateSubject: (id: string, updateSubjectDto: UpdateSubjectDto) => Promise<SubjectApiResponse>;
  deleteSubject: (id: string) => Promise<DeleteApiResponse>;
  /** Projects **/
  getProjects: () => Promise<ProjectApiResponse>;
  getProjectById: (id: string) => void;
  createProject: (createProjectDto: CreateProjectDto) => Promise<CreateProjectApiResponse>;
  updateProject: (id: string, updateProjectDto: UpdateProjectDto) => Promise<CreateProjectApiResponse>;
  deleteProject: (id: string) => Promise<DeleteApiResponse>
  /** Questions **/
  getQuestions: () => Promise<QuestionsApiResponse>
  createQuestion: (createQuestionDto: CreateQuestionsDto) => Promise<QuestionsApiResponse>;
  deleteQuestion: (id: string) => Promise<DeleteApiResponse>
  /** Evaluation **/
  getEvaluations: () => Promise<EvaluationApiResponse>
  getEvaluationsByUser: (id: string) => Promise<EvaluationApiResponse>
  submitEvaluation: (createEvaluation: EvaluationData) => Promise<EvaluationApiResponse>
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  /** Subjects **/
  getSubjects: () => Promise.resolve({
    data: [],
    status: 0
  }),
  createSubject:  () => Promise.resolve({
    data: [],
    status: 0
  }),
  updateSubject: () => Promise.resolve({
    data: [],
    status: 0
  }),
  deleteSubject: () => Promise.resolve({
    data: '',
    status: 0
  }),
  /** Projects **/
  getProjects: () => Promise.resolve({
    data: [],
    status: 0
  }),
  getProjectById: () => {},
  createProject: () => Promise.resolve({
    data: {
      id: '',
      project_name: '',
      description: '',
      image_url: '',
      members: [],
      subject: {
        id: '',
        subject_name: '',
        showOnExpo: true,
        subject_field: '',
        description: ''
      }
    },
    status: 0
  }),
  updateProject: () => Promise.resolve({
    data: {
      id: '',
      project_name: '',
      description: '',
      image_url: '',
      members: [],
      subject: {
        id: '',
        subject_name: '',
        showOnExpo: true,
        subject_field: '',
        description: ''
      }
    },
    status: 0
  }),
  deleteProject: () => Promise.resolve({
    data: '',
    status: 0
  }),
  /** Questions **/
  getQuestions: () => Promise.resolve({
    data: [],
    status: 0
  }),
  createQuestion: () => Promise.resolve({
    data: [],
    status: 0
  }),
  deleteQuestion: () => Promise.resolve({
    data: '',
    status: 0
  }),
  /** Evaluate **/
  getEvaluations: () => Promise.resolve({
    data: [],
    status: 0
  }),
  getEvaluationsByUser: () => Promise.resolve({
    data: [],
    status: 0
  }),
  submitEvaluation: () => Promise.resolve({
    data: [],
    status: 0
  })
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  /** Subjects functions **/
  const getSubjects = (): Promise<SubjectApiResponse> => axios.get(`${BACKEND_URL}/subjects`);
  const createSubject = (createSubjectDto: CreateSubjectDto): Promise<SubjectApiResponse> => axios.post(`${BACKEND_URL}/subjects`, createSubjectDto);
  const updateSubject = (id: string, updateSubjectDto: UpdateSubjectDto): Promise<SubjectApiResponse> => axios.put(`${BACKEND_URL}/subjects/${id}`, updateSubjectDto);
  const deleteSubject = (id: string) => axios.delete(`${BACKEND_URL}/subjects/${id}`);

  /** Projects functions **/
  const getProjects = () => axios.get(`${BACKEND_URL}/projects`)
  const getProjectById = (id: string) => axios.get(`${BACKEND_URL}/projects/${id}`)
  const createProject = (createProjectDto: CreateProjectDto) => axios.post(`${BACKEND_URL}/projects`, createProjectDto)
  const updateProject = (id: string, updateProjectDto: UpdateProjectDto) => axios.put(`${BACKEND_URL}/projects/${id}`, updateProjectDto)
  const deleteProject = (id: string) => axios.delete(`${BACKEND_URL}/projects/${id}`)

  /** Questions functions **/
  const getQuestions = (): Promise<QuestionsApiResponse> => axios.get(`${BACKEND_URL}/questions`)
  const createQuestion = (createQuestionDto: CreateQuestionsDto): Promise<QuestionsApiResponse> => axios.post(`${BACKEND_URL}/questions`, createQuestionDto)
  const deleteQuestion = (id: string): Promise<DeleteApiResponse> => axios.delete(`${BACKEND_URL}/questions/${id}`)
  
  /** Evaluation functions **/
  const getEvaluations = () => axios.get(`${BACKEND_URL}/evaluation`)
  const getEvaluationsByUser = (id: string) => axios.get(`${BACKEND_URL}/evaluation/user/${id}`)
  const submitEvaluation = (createEvaluation: EvaluationData) => axios.post(`${BACKEND_URL}/evaluation`, createEvaluation)

  return (
    <BackendContext.Provider 
      value={{ 
        getSubjects, createSubject, updateSubject, deleteSubject, 
        getProjects, getProjectById, createProject, updateProject, deleteProject,
        getQuestions, createQuestion, deleteQuestion,
        getEvaluations, getEvaluationsByUser, submitEvaluation
      }}>{children}</BackendContext.Provider>
  )
}