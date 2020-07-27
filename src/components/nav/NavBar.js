import { useAuth0 } from "../../contexts/react-auth0-context";
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

const NavBar = ({ authUser, authToken }) => {
  const { isAuthenticated, loading } = useAuth0();

  return (
    <nav>
      <ul className="nav-link-btns">
        {!loading && isAuthenticated && authToken && (
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
        {!loading && isAuthenticated && authUser.username && authToken[0] ? (
          <li>
            <FontAwesomeIcon icon={faUser} />
            <Link className="nav-link" to="/user/profile/credits">
              {" "}
              Profile{" "}
            </Link>
          </li>
        ) : null}
        {!loading && isAuthenticated && authUser.username && authToken[0] ? (
          <li>
            <FontAwesomeIcon icon={faPollH} />

            <Link className="nav-link" to="/leaderBoard">
              {" "}
              Leader Board{" "}
            </Link>
          </li>
        ) : null}
        {!loading && isAuthenticated && authUser.username && authToken[0] ? (
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
