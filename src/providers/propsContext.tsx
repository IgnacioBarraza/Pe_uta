import { clearUserData } from "@/utils/authHelpers"
import { useState, createContext, useEffect } from "react"

type PropsDataProviderType = {
  setUserType: (userType: string) => void
  userType: string | null
  setTokenData: (token: string) => void
  userToken: string | null
  setUserName: (username: string) => void
  userName: string | null
  logout: () => void
  setUserId: (id_usuario: string) => void
  userId: string | null
  setUserRut: (rut: string) => void
  userRut: string | null
}

export const PropsContext = createContext<PropsDataProviderType>({
  setUserType: () => {},
  userType: null,
  setTokenData: () => {},
  userToken: null,
  setUserName: () => {},
  userName: null,
  logout: () => {},
  setUserId: () => {},
  userId: null,
  setUserRut: () => {},
  userRut: null
})

export const PropsDataProvider = ({ children }) => {
  const [userType, setUserType] = useState<string | null>(localStorage.getItem("userType") || "");
  const [userToken, setTokenData] = useState<string | null>(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName") || "");
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userid") || "");
  const [userRut, setUserRut] = useState<string | null>(localStorage.getItem("userRut") || "");

  useEffect(() => {
    localStorage.setItem("userType", userType || "");
    localStorage.setItem("token", userToken || "");
    localStorage.setItem("userName", userName || "");
    localStorage.setItem("userid", userId || "");
    localStorage.setItem("userRut", userRut || "");
  }, [userType, userToken, userName, userId, userRut]);

  const logout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    setUserId(null);
    setUserRut(null);
    clearUserData();
  };

  return (
    <PropsContext.Provider value={{ 
      userType, setUserType,
      userToken, setTokenData, 
      userName, setUserName,
      logout,
      userId, setUserId,
      userRut, setUserRut
    }}>{children}</PropsContext.Provider>
  );
};
