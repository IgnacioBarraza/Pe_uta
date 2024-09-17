import { clearUserData } from "@/utils/authHelpers";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

interface JwtPayload {
  exp: number; // expiration time (seconds since epoch)
}

export const useAutoLogout = (token: string | null) => {
  useEffect(() => {
    if (!token) return;

    // Decode the token to get the expiration time
    const decoded: JwtPayload = jwtDecode(token);

    // Calculate the time until the token expires
    const currentTime = Date.now() / 1000; // get current time in seconds
    const timeUntilExpiration = decoded.exp - currentTime;

    if (timeUntilExpiration <= 0) {
      // Token has already expired, log out immediately
      logoutUser();
    } else {
      // Set a timeout to log out the user when the token expires
      const timeoutId = setTimeout(() => {
        logoutUser();
      }, timeUntilExpiration * 1000); // convert seconds to milliseconds

      // Clear the timeout if the component unmounts or token changes
      return () => clearTimeout(timeoutId);
    }
  }, [token]);

  const logoutUser = () => {
    // Remove the token from localStorage or wherever it's stored
    clearUserData()
    console.log("Session expired. Logging out.");
  };
};
