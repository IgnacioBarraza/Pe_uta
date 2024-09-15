import axios from "axios";
import { createContext, ReactNode } from "react";
import { AuthApiResponse, LoginUserDto, RegisterUserDto } from "@/utils/utils";

const DEV_BACKEND_URL = "http://localhost:3000"
// const PROD_BACKEND_URL = "https://bak.torresproject.com"

type AuthContextType = {
  login: (loginUserDto: LoginUserDto) => Promise<AuthApiResponse>;
  registerUser: (registerUserDto: RegisterUserDto) => Promise<AuthApiResponse>;
}

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType>({
  login: () => Promise.resolve({
    data: {
      accessToken: ''
    },
    status: 0
  }),
  registerUser: () => Promise.resolve({
    data: {
      accessToken: ''
    },
    status: 0
  }),
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = (loginUserDto: LoginUserDto): Promise<AuthApiResponse> => axios.post(`${DEV_BACKEND_URL}/user/login`, loginUserDto);
  const registerUser = (registerUserDto: RegisterUserDto): Promise<AuthApiResponse> => axios.post(`${DEV_BACKEND_URL}/user/register`, registerUserDto)

  return <AuthContext.Provider value={{ login, registerUser }}>{children}</AuthContext.Provider>
}