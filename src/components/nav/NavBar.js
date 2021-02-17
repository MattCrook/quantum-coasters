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
  faCommentDots,
  faNewspaper,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ authUser, authToken }) => {
  const { isAuthenticated, loading } = useAuth0();
  let token;

  if (authToken) {
    authToken.length > 0
    ? (token = authToken[0])
    : (token = null)
  };

  return (
    <nav>
      <ul className="nav-link-btns">
        {!loading && isAuthenticated && authToken && (
          <li className="nav-link-li">
            <FontAwesomeIcon icon={faHome} />
            <Link
              className="nav-link"
              to="/home"
            >
              {" "}
              Home{" "}
            </Link>
          </li>
        )}
        {!loading && isAuthenticated && authUser.username && token ? (
          <li className="nav-link-li">
            <FontAwesomeIcon icon={faUser} />
            <Link className="nav-link" to="/user/profile/credits">
              {" "}
              Profile{" "}
            </Link>
          </li>
        ) : null}
        {!loading && isAuthenticated && authUser.username && token ? (
          <li className="nav-link-li">
            <FontAwesomeIcon icon={faPollH} />

            <Link className="nav-link" to="/leaderBoard">
              {" "}
              Leader Board{" "}
            </Link>
          </li>
        ) : null}
        {!loading && isAuthenticated && authUser.username && token ? (
          <li className="nav-link-li">
            <FontAwesomeIcon icon={faCommentDots} />
            <Link className="nav-link" to="/forum">
              {" "}
              Forum{" "}
            </Link>
          </li>
        ) : null}
        {!loading && isAuthenticated && authUser.username && token ? (
          <li className="nav-link-li">
            <FontAwesomeIcon icon={faNewspaper} />
            <Link className="nav-link" to="/news">
              {" "}
              News{" "}
            </Link>
          </li>
        ) : null}
        {!loading && isAuthenticated && authUser.username && token ? (
          <li className="nav-link-li">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <Link className="nav-link" to="/plan">
              {" "}
              Plan{" "}
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default withRouter(NavBar);
