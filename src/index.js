import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Auth0ProviderWithHistory from "./components/auth/auht0ProviderWithHistory";
// import { Auth0Provider } from "./contexts/react-auth0-context";
// import config from "./auth_config.json";
// import history from "./utils/history";

// import configureStore from './store'
// import createHistory from 'history/createBrowserHistory'
// import { ConnectedRouter } from 'react-router-redux'
// import { Provider } from 'react-redux
// const history = createHistory()
// const store = configureStore(history)

// A function that routes the user to the right place after login
// const onRedirectCallback = (appState) => {
//   history.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname);
// };

// ReactDOM.render(
//   <BrowserRouter>
//     <Auth0Provider
//       domain={config.domain}
//       client_id={config.client_id}
//       redirect_uri={`${window.location.origin}/home`}
//       onRedirectCallback={onRedirectCallback}
//       audience={config.audience}
//       scope={config.scope}
//     >
//       <App />
//     </Auth0Provider>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

// The Context from React Router must be present in the component tree at a higher level
// for Auth0ProviderWithHistory to access the useHistory() hook from React Router.

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
