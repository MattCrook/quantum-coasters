import { useAuth0 } from "../../contexts/react-auth0-context";
import React from "react";
import "./Messages.css";

const MessageCard = props => {
  const { user } = useAuth0();
  const username = user.nickname;
  const userId = props.message.userId;
  const text = props.message.message;
  const timestamp = props.message.timestamp;

  return (
    <div className="card">
      <div className="card-content, message-container">
        <img src={props.userProfile.picUrl} alt="Avatar" />
        <p>
          <strong className="name">{props.message.user.first_name}</strong>:{" "}
          {text}
        </p>
        {/*
          If the active user id === the message's user id
          then output the edit button
        */}
        {props.userProfile.id === userId ? (
          <button
            className="edit-outline-icon"
            onClick={() => props.setMessageToEdit(props.message)}
          >
            Edit
          </button>
        ) : null}
        <span className="message-time-right">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageCard;
