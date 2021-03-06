import React, { useState, useEffect, useContext } from "react";
import { useAuth0 } from "./react-auth0-context";
import userManager from "../modules/users/userManager";

export const AuthUserContext = React.createContext();
export const useAuthUser = () => useContext(AuthUserContext);

export const AuthUserProvider = ({ children }) => {
  const { user, getIdTokenClaims, getTokenSilently, isAuthenticated } = useAuth0();
  const [userProfile, setUserProfile] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [userCredits, setUserCredits] = useState([]);
  const [authToken, setAuthToken] = useState([]);
  const [authUserData, setAuthUserData] = useState([]);


  useEffect(() => {
    if (user && isAuthenticated) {
      const userEmail = user.email;
      sessionStorage.setItem("credentials", JSON.stringify(userEmail));
      const initUserProfile = async (userEmail) => {
        const tokenId = await getIdTokenClaims();
        const accessToken = await getTokenSilently();

        if (tokenId && accessToken) {
          sessionStorage.setItem("IdToken", JSON.stringify(tokenId));
          sessionStorage.setItem("accessToken", accessToken);
        }
        const userData = await userManager.getAuthUser(userEmail);

        if (userData && userData.id && userData.user) {
          const creditsArray = userData.credits;
          setUserProfile(userData);
          setAuthUser(userData.user);
          setUserCredits(creditsArray);

          const djangoAuthToken = sessionStorage.getItem("QuantumToken");
          setAuthToken(djangoAuthToken);
        } else {
          console.log("Please Complete your Profile. :) ");
        }
      };
      initUserProfile(userEmail);
    }
  }, [user, getIdTokenClaims, getTokenSilently, isAuthenticated]);


  return (
    <AuthUserContext.Provider
      value={{
        userProfile,
        authUser,
        userCredits,
        authToken,
        setUserProfile,
        setAuthUser,
        setAuthToken,
        setUserCredits,
        setAuthUserData,
        authUserData,
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};
