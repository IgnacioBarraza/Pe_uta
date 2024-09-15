import { jwtDecode } from "jwt-decode";

/**
 * Function to decode the JWT token
 * @param token token to be decoded
 * @returns decoded token to be used to access data
 */
export const decodeToken = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

/**
 * Function to save user data to localStorage
 * @param decodedToken decodedToken to extract the necessary data
 * @param token token to authenticated user and grant permission if needed
 * @returns id, name, user_type, evaluated and token to set them to be used along the app
 */
export const saveUserData = (decodedToken: any, token: string) => {
  const { id, name, user_type, evaluated } = decodedToken;

  localStorage.setItem('token', token);
  localStorage.setItem('userId', id);
  localStorage.setItem('userName', name);
  localStorage.setItem('userRole', user_type);
  localStorage.setItem('userEvaluations', JSON.stringify(evaluated));

  return {id, name, user_type, evaluated, token}
};

/**
 * Function to clear user data (if needed, for logout or token expiration)
 * and return to home page
 */
export const clearUserData = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEvaluations');
  window.location.replace('/inicio')
};
