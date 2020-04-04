import { useAuth0 } from "../../contexts/react-auth0-context";
// import { userProfileContext } from "../../contexts/react-auth0-context";
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faPollH,
  faCommentDots
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ userProfile }) => {
  const { isAuthenticated, loading } = useAuth0();


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <nav>
      <ul>
        {isAuthenticated && (
          <li>
            <FontAwesomeIcon icon={faHome} />
            <Link
              className="nav-link"
              // to={{ pathname: "/home", userProfile: userProfile }}
              to="/home"
            >
              {" "}
              Home{" "}
            </Link>
          </li>
        )}
        {isAuthenticated && userProfile.email ? (
          <li>
            <FontAwesomeIcon icon={faUser} />
            <Link className="nav-link" to="/users">
              {" "}
              Profile{" "}
            </Link>
          </li>
        ) : null}
        {isAuthenticated && userProfile.email ? (
          <li>
            <FontAwesomeIcon icon={faPollH} />

            <Link className="nav-link" to="/leaderBoard">
              {" "}
              Leader Board{" "}
            </Link>
          </li>
        ) : null}
        {isAuthenticated && userProfile.email ? (
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
