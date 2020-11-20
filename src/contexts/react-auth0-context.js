import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
// import createContext from "react"

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

/* ToDo: create custom context for userProfile in addition to Auth0 context for better state management */
// export const UserProfileContext = React.createContext();
// export const currentUserProfile = useContext(UserProfileContext);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
  // domain/clientId/redirect_Uri
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [idToken, setIdToken] = useState();
  const [appInitOptions, setAppInitOptions] = useState({
    user_sub: "",
    domain: "",
    client_id: "",
    redirect_uri: "",
    audience: "",
    scope: "",
    transactions: "",
    nonce: "",
    access_token: "",
    updated_at: "",
  });

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0(auth0FromHook);

      const transactions = auth0FromHook.transactionManager;

      if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      const tokenId = await auth0FromHook.getIdTokenClaims();
      setIdToken(tokenId);

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);

        if (tokenId && user) {
          const initObject = {
            user_id: "",
            user_sub: user.sub.replace("|", "."),
            domain: initOptions.domain,
            client_id: initOptions.client_id,
            redirect_uri: initOptions.redirect_uri,
            audience: initOptions.audience,
            scope: initOptions.scope,
            transactions: transactions,
            nonce: tokenId.nonce,
            access_token: tokenId.__raw,
            updated_at: tokenId.updated_at,
          };
          setAppInitOptions([initObject]);
        }
      }
      setLoading(false);
    };
    initAuth0();
    // eslint-disable-next-line
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      await auth0Client.loginWithPopup(params);
    } catch (error) {
      console.error(error);
    } finally {
      setPopupOpen(false);
    }
    const user = await auth0Client.getUser();
    setUser(user);
    setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    setLoading(true);
    await auth0Client.handleRedirectCallback();
    const user = await auth0Client.getUser();
    setLoading(false);
    setIsAuthenticated(true);
    setUser(user);
  };

  const clearStorage = () => {
    auth0Client.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("IdToken");
    sessionStorage.removeItem("QuantumToken");
    sessionStorage.removeItem("credentials");
  };

  const djangoRestAuthLogout = async (logout, clearStorage, userToLogout) => {
    try {
      const response = await fetch("http://localhost:8000/rest-auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToLogout),
      });
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse);
        clearStorage(logout);
      }
      throw new Error("Request Failed");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <Auth0Context.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        popupOpen,
        loginWithPopup,
        handleRedirectCallback,
        clearStorage,
        djangoRestAuthLogout,
        appInitOptions,
        getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
        loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
        getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
        getTokenWithPopup: (...p) => auth0Client.getTokenWithPopup(...p),
        logout: (...p) => auth0Client.logout(...p),
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
