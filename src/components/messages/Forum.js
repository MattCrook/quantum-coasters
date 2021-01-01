import React, { useState, useEffect } from "react";
// import userManager from "../../modules/users/userManager";
import messageManager from "../../modules/messages/messageManager";
import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import "./Messages.css";
import "./Forum.css";

const Forum = (props) => {
  const { authUser, userProfile } = useAuthUser();
  const { user, loading, logout, clearStorage, djangoRestAuthLogout } = useAuth0();
    const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
    
    const renderGeneralMessages = () => {
        props.history.push("/messages");
    }

  return (
    <>
      <nav id="nav_forum_container" className="navbar is-dark">
        <div className="forum_container_1">
          <div className="navbar-brand">
            <button id="quantum_logo_forum" className="navbar-item">
              Quantum Coasters
            </button>
          </div>
        </div>

        <div className="forum_container_2">
          {!loading && user && (
            <>
              <button className="navbar-item-name">
                {authUser.first_name} {authUser.last_name}
              </button>
              {userProfile.image ? (
                <img id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
              ) : (
                <img id="profile-pic" src={defaultProfilePicture} alt="My Avatar" />
              )}
              <button
                onClick={() => djangoRestAuthLogout(logout, clearStorage, authUser)}
                className="navbar-item-logout-btn"
              >
                Logout
              </button>
              <i className="fas fa-sign-out-alt"></i>
              <hr />
            </>
          )}
        </div>
      </nav>
      <div className="main_container">
        <div className="forum_title_container">
          <div className="forum_title">Quantum Forum</div>
          <div className="forum_description">Welcome tho the Quantum Forum! Choose a channel and start chatting.</div>
          {/* <div className="forum_description">Choose a channel and start chatting.</div> */}
              </div>
              <div className="forum_header_container">
                  <div className="header_section_button" onClick={(e) => renderGeneralMessages(e)}>General</div>
                  <div className="header_section_button">Start A Group Chat</div>
                  <div className="header_section_button">Private Message</div>
              </div>
      </div>
    </>
  );
};

export default Forum;
