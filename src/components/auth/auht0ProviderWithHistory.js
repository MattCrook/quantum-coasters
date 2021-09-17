import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "../../contexts/react-auth0-context";
import config from "../../auth_config.json";
// import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const history = useHistory();
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;


  // A function that routes the user to the right place after login.
  const onRedirectCallback = (appState) => {
    history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      client_id={clientId}
      redirect_uri={`${window.location.origin}/home`}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
      scope={config.scope}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
