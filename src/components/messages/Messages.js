import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";
import { useAuth0 } from "../../contexts/react-auth0-context";

import "./Messages.css";

const MessageList = props => {
  const { user, loading, logout } = useAuth0();
  const [userProfile, setUserProfile] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageToEdit, setMessageToEdit] = useState({
    text: "",
    userId: "",
    timestamp: ""
  });

  const getMessages = async () => {
    const value = await ApiManager.getAllMessages();
    return setMessages(value);
  };

  const getUserProfile = async user => {
    try {
      const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
      setUserProfile(userProfileFromAPI[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMessages();
    getUserProfile(user);
  }, []);

  return (
    <>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-menu is-active">
            {/* logo */}
            <div className="navbar-brand">
              <button className="navbar-item">Quantum</button>
            </div>
            {/* menu items */}
            <div className="navbar-end">
              {/* if there is a user. show the login button */}
              {!loading && user && (
                <>
                  <div className="navbar-end">
                    <button className="navbar-item">{userProfile.first_name} {userProfile.last_name}</button>
                    {user.picture ? (
                      <img
                        id="profile-pic"
                        src={userProfile.picUrl}
                        alt="My Avatar"
                      />
                    ) : (
                      <img
                        id="profile-pic"
                        src={user.picture}
                        alt="My Avatar"
                      />
                    )}
                    <button
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                      className="navbar-item"
                    >
                      Logout
                    </button>
                    <hr />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="profile-pic-header"> */}
        {/* {userProfile.picUrl ? (
          <img id="profile-pic" src={userProfile.picUrl} alt="My Avatar" />
        ) : (
          <img id="google-profile-pic" src={user.picture} alt="My Avatar" />
        )} */}
      {/* </div> */}
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
                .sort(function(a, b) {
                  return new Date(a.timestamp) - new Date(b.timestamp);
                })
                .map(message => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    setMessageToEdit={setMessageToEdit}
                    userProfile={userProfile}
                    {...props}
                  />
                ))}
            </div>
          </div>
          <div className="container-form">
            <MessageForm
              userProfile={userProfile}
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
