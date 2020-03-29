import { useAuth0 } from "../../contexts/react-auth0-context";
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faPollH, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <nav>
      <ul>
        {isAuthenticated ? (
          <li>
            <FontAwesomeIcon icon={faHome} />
            <Link className="nav-link" to="/home">
              {" "}
              Home{" "}
            </Link>
          </li>
        ) : null}
        {isAuthenticated ? (
          <li>
            <FontAwesomeIcon icon={faUser} />

            <Link className="nav-link" to="/users">
              {" "}
              Profile{" "}
            </Link>
          </li>
        ) : null}
        {isAuthenticated ? (
          <li>
            <FontAwesomeIcon icon={faPollH} />

            <Link className="nav-link" to="/leaderBoard">
              {" "}
              Leader Board{" "}
            </Link>
          </li>
        ) : null}
        {isAuthenticated ? (
          <li>
            <FontAwesomeIcon icon={faCommentDots} />
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
