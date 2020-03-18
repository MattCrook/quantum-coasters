import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import "./Messages.css";
import { useAuth0 } from "../contexts/react-auth0-context";
import MessageForm from "./MessageForm";
import MessageCard from "./MessageCard";

const MessageList = props => {
  const [messages, setMessages] = useState([]);
  const [messageToEdit, setMessageToEdit] = useState({
    text: "",
    userId: 0,
    timestamp: ""
  });
  const [followingList, setFollowingList] = useState([]);
  const { user } = useAuth0();

  const getMessages = async () => {
    const messagesFromAPI = await ApiManager.getAllMessagesWithExpand(
      "messages",
      user
    );
    setMessages(messagesFromAPI);
  };
  const getFollowingList = async () => {
    const userWithIdFromAPI = await ApiManger.getUserWithId(
      "followings",
      parseInt(user.id)
    );
    setFollowingList(userWithIdFromAPI);
  };
  const amFollowing = currentUser => {
    if (followingList.find(({ followedId }) => followedId === currentUser.id)) {
      return true;
    } else {
      return false;
    }
  };
  const handleFollow = userIdToFollow => {
    const followToSave = {
      userId: user.id,
      followedId: userIdToFollow
    };
    ApiManager.postNewFollow("followings", followToSave).then(getFollowingList);
  };
  useEffect(() => {
    getMessages();
    getFollowingList();
  }, []);

  return (
    <>
      <div className="chat-wrapper">
        <div className="chat-fixed-height-container">
          <div id="chat-headerContainer">
            <h1>CḦÂṪ</h1>
          </div>
          <div className="chat-ScrollToBottom">
            <div className="message-container-cards">
              {/* Sorting by date via: 
              https://stackoverflow.com/questions/10123953/how-to-sort-an-array-by-a-date-property*/}
              {messages.sort(function(a, b) {
                  return new Date(a.timestamp) - new Date(b.timestamp);
                })
                .map(message => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    setMessageToEdit={setMessageToEdit}
                    handleFollow={handleFollow}
                    amFollowing={amFollowing(message.user)}
                  />
                ))}
            </div>
          </div>
          <div className="container-form">
            <MessageForm
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
