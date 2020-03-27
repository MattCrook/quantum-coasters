import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";

import "./Messages.css";

const MessageCard = props => {

  const { user } = useAuth0();
  console.log(user)
  const profilePic = props.message.user.picUrl;
  const userId = props.message.userId;
  const text = props.message.message;
  const timestamp = props.message.timestamp;

  return (
    <div className="card">
      <div className="card-content, message-container">
        {profilePic ? (
          <img id="profile-pic" src={profilePic} alt="My Avatar" />
        ) : (
          <img id="google-profile-pic" src={user.picture} alt="Avatar" />
        )}
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
