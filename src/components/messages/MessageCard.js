import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import ApiManager from "../../modules/ApiManager";
import "./Messages.css";

const MessageCard = ({ message }) => {
  // console.log({ message });

  const { user } = useAuth0();
  const username = user.nickname;
  const userId = message.userId;
  const text = message.message;
  const timestamp = message.timestamp;
  const picUrl = user.picture;



  const [userProfile, setUserProfile] = useState([]);


  const getUserProfile = async user => {
    try {
      const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
      setUserProfile(userProfileFromAPI[0]);
      // console.log(userProfileFromAPI);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getUserProfile(user);
  }, []);


  return (
    <div className="card">
      <div className="card-content, message-container">
        <img src={picUrl} alt="Avatar" />
        <p>
          <strong>{userProfile.first_name}</strong>: {text}
        </p>
        {/*
          If the active user id === the message's user id
          then output the edit button
        */}
        {parseInt(userProfile.id) === userId ? (
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
