import { useAutoLogout } from "@/auth/logout";
import { useProps } from "@/hooks/useProps";
import { Outlet } from "react-router-dom";

export const Layout = () =>  {
  /**
   * Set autoLogout token.
   */
  const { userToken } = useProps()
  useAutoLogout(userToken)


  return (
    <Outlet />
  );
}
