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
  // Check if the redirection already occurred
  if (!localStorage.getItem('redirected')) {
    // Set the flag to indicate the redirect has happened
    localStorage.setItem('redirected', 'true');

    // Clear the user data
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEvaluations');
    
    // Perform the redirection once
    window.location.replace('/inicio');
  }
};

/**
 * Function to format the rut and apply the points and hyppen automatically
 * @param rut receive the rut to be formatted
 * @returns formatted rut
 */
export const formatRut = (rut: string) => {
  if (!rut) return "";

  // Remueve cualquier carácter que no sea un número o la letra K
  rut = rut.replace(/[^0-9kK]/g, "");

  // Si tiene 1 o 2 dígitos, no hagas nada
  if (rut.length <= 1) return rut;

  // Aplica formato progresivo
  if (rut.length <= 4) {
    // Solo añade el guion si tiene más de 1 dígito
    return `${rut.slice(0, -1)}-${rut.slice(-1)}`;
  } else if (rut.length <= 7) {
    // Añade un punto antes de los 3 últimos dígitos
    return `${rut.slice(0, -4)}.${rut.slice(-4, -1)}-${rut.slice(-1)}`;
  } else {
    // Añade puntos y guion completo
    return `${rut.slice(0, -7)}.${rut.slice(-7, -4)}.${rut.slice(-4, -1)}-${rut.slice(-1)}`;
  }
};
