import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./Messages.css";

const MessageCard = ({ message }) => {
  const { user } = useAuth0();

  const username = message.user.username;
  const userId = message.userId;
  const text = message.message;
  const timestamp = message.timestamp;
  const picUrl = message.user.picUrl;

  return (
    <div className="card">
      <div className="card-content, message-container">
        <img src={picUrl} alt="Avatar" />
        <p>
          <strong>{username}</strong>: {text}
        </p>
        {/*
          If the active user id === the message's user id
          then output the edit button
        */}
        {parseInt(user.id) === userId ? (
          <div className="chat-edit-outline-icon" data-tooltip="EDIT">
            <i
              className="edit outline icon"
              // onClick={() => props.setMessageToEdit(props.message)}
              onClick={() => message.setMessageToEdit(message)}
            />
          </div>
        ) : null}
        <span className="message-time-right">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageCard;
