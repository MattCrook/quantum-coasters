import React, { useState, useEffect, useContext } from "react";
import createAuth0Client from "@auth0/auth0-spa-js";
import userManager from "../modules/users/userManager";
import { postErrorLog } from "../modules/services/services";
// import createContext from "react"

const DEFAULT_REDIRECT_CALLBACK = () => window.history.replaceState({}, document.title, window.location.pathname);

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
  children,
  onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
  ...initOptions
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [user, setUser] = useState();
  const [auth0Client, setAuth0] = useState();
  const [loading, setLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [storage, setStorage] = useState([]);
  const [appInitOptions, setAppInitOptions] = useState([]);

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      const transactionsManager = auth0FromHook.transactionManager;
      console.log("initOptions", initOptions)
      console.log("auth0FromHook", auth0FromHook)
      console.log("transactionsManager", transactionsManager)
      console.log("Transaction", transactionsManager.transaction)
      console.log("Storage", transactionsManager.storage)

      setTransactions(transactionsManager.transaction)
      setStorage(transactionsManager.storage)
      setAuth0(auth0FromHook);

      if (window.location.search.includes("code=") && window.location.search.includes("state=")) {
        const { appState } = await auth0FromHook.handleRedirectCallback();
        onRedirectCallback(appState);
      }

      const isAuthenticated = await auth0FromHook.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      const tokenId = await auth0FromHook.getIdTokenClaims();

      if (isAuthenticated) {
        const user = await auth0FromHook.getUser();
        setUser(user);

        if (tokenId && user) {
          const initCredentials = {
            user_sub: user.sub.replace("|", "."),
            // domain: initOptions.domain,
            // client_id: initOptions.client_id,
            redirect_uri: initOptions.redirect_uri,
            audience: initOptions.audience,
            scope: initOptions.scope,
            transactions: transactionsManager,
            nonce: tokenId.nonce,
            access_token: tokenId.__raw,
            django_token: sessionStorage.getItem("QuantumToken"),
            session_id: sessionStorage.getItem("sessionId"),
            updated_at: tokenId.updated_at,
          };
          setAppInitOptions([initCredentials]);
        }
      }
      setLoading(false);
    };
    initAuth0();
  }, []);

  const loginWithPopup = async (params = {}) => {
    setPopupOpen(true);
    try {
      console.log({params})
      const auth = await auth0Client.loginWithPopup(params);
      console.log({auth})
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
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("IdToken");
    sessionStorage.removeItem("QuantumToken");
    sessionStorage.removeItem("credentials");
    sessionStorage.removeItem("sessionId");
    auth0Client.logout();
  };

  const djangoRestAuthLogout = async (logout, clearStorage, userToLogout) => {
    try {
      await userManager.setUserAsInActive({ 'is_currently_active': "False" }, userToLogout.id);
    } catch (error) {
      await postErrorLog(error, "Auth0 Context", "djangoRestAuthLogout");
    }
    try {
      const response = await fetch("http://localhost:8000/rest-auth/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userToLogout),
      });
      if (response.ok) {
        clearStorage(logout);
        return await response.json();
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
        transactions,
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
