import { useContext } from "react"
import { AuthContext } from "../providers/authProvider"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('There is not auth provider to use')
  return context
}