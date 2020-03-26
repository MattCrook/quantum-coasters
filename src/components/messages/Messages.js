import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";
import { useAuth0 } from "../../contexts/react-auth0-context";

import "./Messages.css";

const MessageList = props => {
  const { user } = useAuth0();
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
      <div className="chat-wrapper">
        <div className="chat-fixed-height-container">
          <div id="chat-headerContainer">
            <div className="forum-header">
              <h1>Forum</h1>
            </div>
            <div className="profile-pic-header">
              {user.picture && (
                <img id="profile-pic" src={user.picture} alt="My Avatar" />
              )}
            </div>
          </div>
          <div className="chat-ScrollToBottom">
            <div className="message-container-cards">
              {/* Sorting by date via: 
            https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property*/}
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
