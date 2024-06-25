import axios from "axios"
import { ReactNode, createContext } from "react";

const BACKEND_URL = 'http://localhost:3000'

type BackendContextType = {
  getGroups: () => Promise<any>
  getGroupsById: (id) => Promise<any>
  getMembersByGroup: (id) => Promise<any>
  exportExcel: () => Promise<any>
}

type BackendProviderProps = {
  children: ReactNode;
};


export const BackendContext = createContext<BackendContextType>({
  getGroups: () => Promise.resolve({}),
  getGroupsById: () => Promise.resolve({}),
  getMembersByGroup: () => Promise.resolve({}),
  exportExcel: () => Promise.resolve({})
})

export const BackendProvider = ({children}: BackendProviderProps) => {
  /** Groups endpoints **/
  const getGroups = () => axios.get(`${BACKEND_URL}/grupos-asignaturas`)
  const getGroupsById = (id) => axios.get(`${BACKEND_URL}/grupo-por-id`)
  const getMembersByGroup = (id) => axios.get(`${BACKEND_URL}/integrantes-grupo`)

  /** Excel endpoint **/
  const exportExcel = () => axios.post(`${BACKEND_URL}/export`, {tipo: 1}, {
    responseType: "blob"
  })

  return (
    <BackendContext.Provider value={{ getGroups, getGroupsById, getMembersByGroup, exportExcel }}>{children}</BackendContext.Provider>
  )
}