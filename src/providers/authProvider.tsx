import axios from "axios";
import { createContext, ReactNode } from "react";
import { AuthApiResponse, LoginUserDto, RegisterUserDto } from "@/utils/utils";

const DEV_BACKEND_URL = "https://peuta-develop.up.railway.app"

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
      accessToken: '',
      evaluations: []
    },
    status: 0
  }),
  registerUser: () => Promise.resolve({
    data: {
      accessToken: '',
      evaluations: []
    },
    status: 0
  }),
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const login = (loginUserDto: LoginUserDto): Promise<AuthApiResponse> => axios.post(`${DEV_BACKEND_URL}/api/user/login`, loginUserDto);
  const registerUser = (registerUserDto: RegisterUserDto): Promise<AuthApiResponse> => axios.post(`${DEV_BACKEND_URL}/api/user/register`, registerUserDto)

  return <AuthContext.Provider value={{ login, registerUser }}>{children}</AuthContext.Provider>
}