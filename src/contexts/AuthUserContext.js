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
        try {
          var userProfileData = await userManager.getAuthUser(userEmail);
        } catch (err) {
          console.log(err);
        } finally {
          if (userProfileData && userProfileData.length > 0 && userProfileData[0].id && userProfileData[0].user) {
            const creditsArray = userProfileData.credits;
            setUserProfile(userProfileData[0]);
            setAuthUser(userProfileData[0].user);
            setUserCredits(creditsArray);
            const djangoAuthToken = sessionStorage.getItem("QuantumToken");
            setAuthToken(djangoAuthToken);
          } else {
            console.log("Please Complete your Profile. :) ");
          }
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
