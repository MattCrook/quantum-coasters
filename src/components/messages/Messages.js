import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import MessageCard from "./MessageCard";
import MessageForm from "./MessageForm";
import "./Messages.css";

const MessageList = (props) => {

  const userId = props.userId;

  const [messages, setMessages] = useState([]);
  const [messageToEdit, setMessageToEdit] = useState({
    text: "",
    userId: 0,
    timestamp: ""
  });

  console.log(props);
  console.log(props.userId)

  const getMessages = () => {
    return ApiManager.getAllMessages().then(setMessages);
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <>
      <div className="chat-wrapper">
        <div className="chat-fixed-height-container">
          <div id="chat-headerContainer">
            <h1>Forum</h1>
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
                    userId={userId}
                    {...props}
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
