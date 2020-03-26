import React from "react";
import "bulma/css/bulma.css";
import { useAuth0 } from "./contexts/react-auth0-context";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/nav/NavBar";
import ApplicationViews from "./components/ApplicationViews";
import history from "./utils/history";

const App = () => {
  const { isAuthenticated, loading, user } = useAuth0();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Router history={history}>
        <NavBar user={user}/>
        <ApplicationViews user={user} isAuthenticated={isAuthenticated} />
      </Router>
    </>
  );
};

export default App;
