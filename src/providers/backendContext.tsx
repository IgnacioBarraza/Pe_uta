import axios from "axios"
import { ReactNode, createContext } from "react";

const BACKEND_URL = 'http://localhost:3000'

type BackendContextType = {
  getGroups: () => Promise<any>
  getGroupsById: (id) => Promise<any>
  getMembersByGroup: (id) => Promise<any>
  exportExcel: () => Promise<any>
  getAsignaturas: () => Promise<any>
  createGroup: (groupData) => Promise<any>
  createMembers: (members) => Promise<any>
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  getGroups: () => Promise.resolve({}),
  getGroupsById: () => Promise.resolve({}),
  getMembersByGroup: () => Promise.resolve({}),
  exportExcel: () => Promise.resolve({}),
  getAsignaturas: () => Promise.resolve({}),
  createGroup: () => Promise.resolve({}),
  createMembers: () => Promise.resolve({})
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  /** Groups endpoints **/
  const getGroups = () => axios.get(`${BACKEND_URL}/grupos-asignaturas`)
  const getGroupsById = (id) => axios.get(`${BACKEND_URL}/grupo-por-id`)
  const getMembersByGroup = (id) => axios.get(`${BACKEND_URL}/integrantes-grupo`)
  const createGroup = (groupData) => axios.post(`${BACKEND_URL}/agregar-proyecto`, groupData)

  /** Excel endpoint **/
  const exportExcel = () => axios.post(`${BACKEND_URL}/export`, {tipo: 1}, {
    responseType: "blob"
  })

  /** Asignatura endpoint **/
  const getAsignaturas = () => axios.get(`${BACKEND_URL}/asignaturas`)

  /** Integrantes endpoint **/
  const createMembers = (members) => axios.post(`${BACKEND_URL}/agregar-integrantes`)
  return (
    <BackendContext.Provider value={{ getGroups, getGroupsById, getMembersByGroup, exportExcel, getAsignaturas, createGroup, createMembers }}>{children}</BackendContext.Provider>
  )
}