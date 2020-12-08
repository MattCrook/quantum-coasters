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
        const getAuthUser = await userManager.getAuthUser(userEmail);

        if (getAuthUser.length > 0) {
          const authUserId = getAuthUser[0].id;
          const getProfile = await userManager.getUserProfileEmbeddedAuthUser(authUserId);
          const creditsArray = getProfile[0].credits;

          setAuthUser(getAuthUser[0]);
          setUserProfile(getProfile[0]);
          setUserCredits(creditsArray);

          const djangoAuthToken = sessionStorage.getItem("QuantumToken");
          setAuthToken(djangoAuthToken);
        } else {
          console.log("Please Complete your Profile. :) ");
          setUserProfile([]);
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
      }}
    >
      {children}
    </AuthUserContext.Provider>
  );
};
