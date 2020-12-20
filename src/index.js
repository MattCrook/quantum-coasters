import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import Auth0ProviderWithHistory from "./components/auth/auht0ProviderWithHistory";
import { ActivityLogProvider } from "./contexts/ActivityLogContext";
import { AuthUserProvider } from "./contexts/AuthUserContext";
// import { ErrorLogProvider } from "./contexts/ErrorLogContext";

// The Context from React Router must be present in the component tree at a higher level
// for Auth0ProviderWithHistory to access the useHistory() hook from React Router.

ReactDOM.render(
  <Router>
    <Auth0ProviderWithHistory>
      <AuthUserProvider>
        {/* <ErrorLogProvider> */}
        <ActivityLogProvider>
          <App />
        </ActivityLogProvider>
        {/* </ErrorLogProvider> */}
      </AuthUserProvider>
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById("root")
);

serviceWorker.unregister();
