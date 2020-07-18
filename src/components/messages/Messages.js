import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./Messages.css";

const MessageList = (props) => {
  const { user, loading, logout } = useAuth0();
  const [userProfile, setUserProfile] = useState([]);
  const [authUser, setAuthUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userProfileId, setUserProfileId] = useState({});
  const [messageToEdit, setMessageToEdit] = useState({
    user_id: "",
    text: "",
    timestamp: "",
  });

  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

  const getMessages = async () => {
    const allMessages = await ApiManager.getAllMessages();
    setMessages(allMessages);
  };

  const getUserProfile = async (user) => {
    try {
      const userFromAPI = await ApiManager.getAuthUser(user.email);
      const userId = userFromAPI[0].id;
      const profileFromAPI = await ApiManager.getUserProfileEmbeddedAuthUser(userId);
      setAuthUser(userFromAPI[0]);
      setUserProfile(profileFromAPI[0]);
      const profileId = userFromAPI[0].id;
      setUserProfileId(profileId);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getMessages();
    getUserProfile(user);
    return () => user;
  }, [user]);



  return (
    <>
      <nav id="nav_forum_container" className="navbar is-dark">
        <div className="forum_container_1">
          {/* logo */}
          <div className="navbar-brand">
            <button id="quantum_logo_forum" className="navbar-item">
              Quantum Coasters
            </button>
          </div>
        </div>

        {/* menu items */}
        <div className="forum_container_2">
          {/* if there is a user. show the login button */}
          {!loading && user && (
            <>
              <button className="navbar-item-name">
                {authUser.first_name} {authUser.last_name}
              </button>
              {userProfile.image ? (
                <img
                  id="profile-pic"
                  src={userProfile.image.image}
                  alt="My Avatar"
                />
              ) : (
                <img
                  id="profile-pic"
                  src={defaultProfilePicture}
                  alt="My Avatar"
                />
              )}
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="navbar-item-logout-btn"
              >
                Logout
              </button>
              <hr />
            </>
          )}
        </div>
      </nav>

      <div className="chat-wrapper">
        <div className="chat-fixed-height-container">
          <div id="chat-headerContainer">
            <div className="forum-header">
              <h1>Forum</h1>
            </div>
          </div>
          <div className="chat-ScrollToBottom">
            <div className="message-container-cards">
              {messages
                .sort(function (a, b) {
                  return new Date(a.timestamp) - new Date(b.timestamp);
                })
                .map((message) => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    setMessageToEdit={setMessageToEdit}
                    userProfile={userProfile}
                    authUser={authUser}
                    defaultProfilePicture={defaultProfilePicture}
                    {...props}
                  />
                ))}
            </div>
          </div>
          <div className="container-form">
            <MessageForm
              userProfile={userProfile}
              userProfileId={userProfileId}
              getMessages={getMessages}
              messageToEdit={messageToEdit}
              setMessageToEdit={setMessageToEdit}
              {...props}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MessageList;
