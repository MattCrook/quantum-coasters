import React from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./Messages.css";

const MessageCard = props => {

  const { user } = useAuth0();

  const profilePic = props.message.user.picUrl;
  const userId = props.message.userId;
  const text = props.message.message;
  const timestamp = props.message.timestamp;

  return (
    <div className="message-card">
      <div className="card-content, message-container">
        {profilePic ? (
          <img id="profile-pic" src={profilePic} alt="My Avatar" />
        ) : (
          <img id="google-profile-pic" src={props.defaultProfilePicture} alt="My Avatar" />
        )}
        <p>
          <strong className="message-name">{props.message.user.first_name}</strong>:{" "}
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
