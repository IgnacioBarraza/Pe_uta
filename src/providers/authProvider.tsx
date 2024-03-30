import axios from "axios";
import { createContext } from "react";

type AuthContextType = {
  signup: (rut, password) => void
}

export const AuthContext = createContext<AuthContextType>({
  signup: () => {}
})

export const AuthProvider = () => {
  const signup = (rut: string, password: string) => {

  }

}