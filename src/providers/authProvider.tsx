import axios from "axios";
import { createContext, ReactNode } from "react";
import { LoginApiResponse, LoginUserDto } from "@/utils/utils";

const DEV_BACKEND_URL = "http://localhost:3000"
// const PROD_BACKEND_URL = "https://bak.torresproject.com"

type AuthContextType = {
  register: (rut, password) => void
  login: (loginUserDto: LoginUserDto) => Promise<LoginApiResponse>;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  register: () => {},
  login: () => Promise.resolve({
    data: {
      accessToken: ''
    },
    status: 0
  })
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = (loginUserDto: LoginUserDto): Promise<LoginApiResponse> => axios.post(`${DEV_BACKEND_URL}/user/login`, loginUserDto)
  const register = () => {}

  return <AuthContext.Provider value={{ login, register }}>{children}</AuthContext.Provider>
}