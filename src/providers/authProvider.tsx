import axios from "axios";
import { createContext } from "react";
import { LoginData } from "../utils/utils";

const DEV_BACKEND_URL = "https://bak.torresproject.com"
// const PROD_BACKEND_URL = "https://bak.torresproject.com"

type AuthContextType = {
  signup: (rut, password) => void
  login: (loginData: LoginData) => void
}

export const AuthContext = createContext<AuthContextType>({
  signup: () => {},
  login: () => {}
})

export const AuthProvider = () => {
  const signup = (rut: string, password: string) => {}

  const login =  (loginData: LoginData) => axios.post(`${DEV_BACKEND_URL}/registro-o-inicio-sesion`)

}