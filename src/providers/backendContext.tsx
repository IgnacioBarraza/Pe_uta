import { CreateSubjectDto, SubjectApiResponse, SubjectDeleteApiResponse, UpdateSubjectDto } from "@/utils/utils";
import axios from "axios"
import { ReactNode, createContext } from "react";

const BACKEND_URL = 'http://localhost:3000'

type BackendContextType = {
  /** Subjects **/
  getSubjects: () => Promise<SubjectApiResponse>;
  createSubject: (createSubjectDto: CreateSubjectDto) => Promise<SubjectApiResponse>;
  updateSubject: (id: string, updateSubjectDto: UpdateSubjectDto) => Promise<SubjectApiResponse>;
  deleteSubject: (id: string) => Promise<SubjectDeleteApiResponse>;
  /** Projects **/
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  /** Subjects **/
  getSubjects: () => Promise.resolve({
    data: {
      id: '',
      showOnExpo: true,
      subject_name: ''
    },
    status: 0
  }),
  createSubject:  () => Promise.resolve({
    data: {
      id: '',
      showOnExpo: true,
      subject_name: ''
    },
    status: 0
  }),
  updateSubject: () => Promise.resolve({
    data: {
      id: '',
      showOnExpo: true,
      subject_name: ''
    },
    status: 0
  }),
  deleteSubject: () => Promise.resolve({
    data: '',
    status: 0
  }),
  /** Projects **/
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  /** Subjects functions **/
  const getSubjects = (): Promise<SubjectApiResponse> => axios.get(`${BACKEND_URL}/subjects`);
  const createSubject = (createSubjectDto: CreateSubjectDto): Promise<SubjectApiResponse> => axios.post(`${BACKEND_URL}/subjects`, createSubjectDto);
  const updateSubject = (id: string, updateSubjectDto: UpdateSubjectDto): Promise<SubjectApiResponse> => axios.put(`${BACKEND_URL}/subjects/${id}`, updateSubjectDto);
  const deleteSubject = (id: string) => axios.delete(`${BACKEND_URL}/subjects/${id}`);

  /** Projects functions **/


  return (
    <BackendContext.Provider value={{ getSubjects, createSubject, updateSubject, deleteSubject }}>{children}</BackendContext.Provider>
  )
}