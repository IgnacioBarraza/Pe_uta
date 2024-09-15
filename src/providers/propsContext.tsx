import { useState, createContext, useEffect } from "react"

type PropsDataProviderType = {
  setUserType: (userType: string) => void
  userRole: string | null
  setTokenData: (token: string) => void
  userToken: string | null
  setUserName: (username: string) => void
  userName: string | null
  logout: () => void
  setUserId: (id_usuario: string) => void
  userId: string | null}

export const PropsContext = createContext<PropsDataProviderType>({
  setUserType: () => {},
  userRole: null,
  setTokenData: () => {},
  userToken: null,
  setUserName: () => {},
  userName: null,
  logout: () => {},
  setUserId: () => {},
  userId: null,
})

export const PropsDataProvider = ({ children }) => {
  const [userRole, setUserType] = useState<string | null>(localStorage.getItem("userRole") || "");
  const [userToken, setTokenData] = useState<string | null>(localStorage.getItem("token") || "");
  const [userName, setUserName] = useState<string | null>(localStorage.getItem("userName") || "");
  const [userId, setUserId] = useState<string | null>(localStorage.getItem("userId") || "");

  useEffect(() => {
    localStorage.setItem("userRole", userRole || "");
    localStorage.setItem("token", userToken || "");
    localStorage.setItem("userName", userName || "");
    localStorage.setItem("userId", userId || "");
  }, [userRole, userToken, userName, userId]);

  const logout = () => {
    setUserName(null);
    setTokenData(null);
    setUserType(null);
    setUserId(null);
  };

  return (
    <PropsContext.Provider value={{ 
      userRole, setUserType,
      userToken, setTokenData, 
      userName, setUserName,
      logout,
      userId, setUserId,
    }}>{children}</PropsContext.Provider>
  );
};
