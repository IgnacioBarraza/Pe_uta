import { jwtDecode } from "jwt-decode";

// Function to decode the JWT token
export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// Function to save user data to localStorage
/**
 * 
 * @param decodedToken 
 */
export const saveUserData = (decodedToken: any) => {
  const { userId, name, user_type, evaluations } = decodedToken;

  localStorage.setItem('token', decodedToken.token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('userName', name);
  localStorage.setItem('userRole', user_type);
  localStorage.setItem('userEvaluations', JSON.stringify(evaluations));
};

// Function to clear user data (if needed, for logout or token expiration)
export const clearUserData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEvaluations');
  window.location.replace('/inicio')
};
