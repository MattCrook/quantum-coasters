import { useAuth0 } from "../../contexts/auth0-context";
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <li>
            <Link className="nav-link" to="/home">
              {" "}
              Home{" "}
            </Link>
          </li>
        ) : null}
        {isAuthenticated ? (
          <li>
            <Link className="nav-link" to="/profile">
              {" "}
              Profile{" "}
            </Link>
          </li>
        ) : null}
        {isAuthenticated ? (
          <li>
            <Link className="nav-link" to="/leaderboard">
              {" "}
              Leader Board{" "}
            </Link>
          </li>
        ) : null}
                {isAuthenticated ? (
          <li>
            <Link className="nav-link" to="/messages">
              {" "}
              Forum{" "}
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
