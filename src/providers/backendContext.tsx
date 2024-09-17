import { CreateSubjectDto, SubjectApiResponse, UpdateSubjectDto } from "@/utils/utils";
import axios from "axios"
import { ReactNode, createContext } from "react";

const BACKEND_URL = 'http://localhost:3000'

type BackendContextType = {
  /** Subjects **/
  getSubjects: () => void;
  createSubject: (createSubjectDto: CreateSubjectDto) => Promise<SubjectApiResponse>;
  updateSubject: (id: string, updateSubjectDto: UpdateSubjectDto) => void;
  deleteSubject: (id: string) => void;
  /** Projects **/
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  /** Subjects **/
  getSubjects: () => {},
  createSubject:  () => Promise.resolve({
    data: {
      id: '',
      showOnExpo: true,
      subject_name: ''
    },
    status: 0
  }),
  updateSubject: () => {},
  deleteSubject: () => {},
  /** Projects **/
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  /** Subjects functions **/
  const getSubjects = () => axios.get(`${BACKEND_URL}/subjects`);
  const createSubject = (createSubjectDto: CreateSubjectDto): Promise<SubjectApiResponse> => axios.post(`${BACKEND_URL}/subjects`, createSubjectDto);
  const updateSubject = (id: string, updateSubjectDto: UpdateSubjectDto) => axios.put(`${BACKEND_URL}/subjects/${id}`, updateSubjectDto);
  const deleteSubject = (id: string) => axios.delete(`${BACKEND_URL}/subjects/${id}`);

  /** Projects functions **/


  return (
    <BackendContext.Provider value={{ getSubjects, createSubject, updateSubject, deleteSubject }}>{children}</BackendContext.Provider>
  )
}