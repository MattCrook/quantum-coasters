import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import ApiManager from "../../modules/ApiManager";
import "./Messages.css";

const MessageCard = (props) => {
  console.log({ props });

  const { user } = useAuth0();
  console.log({ user });  
  
  
  const username = user.nickname;
  const userId = props.message.userId;
  const text = props.message.message;
  const timestamp = props.message.timestamp;
  const picUrl = user.picture;
  

  
  const [userProfile, setUserProfile] = useState([]);
  console.log({ userProfile });


  const getUserProfile = async user => {
    try {
      const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
      setUserProfile(userProfileFromAPI[0]);
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
        {userProfile.id === userId ? (
          <div className="chat-edit-outline-icon">
            <button
              className="edit-outline-icon"
              onClick={() => props.setMessageToEdit(props.message)}
            >EDIT</button>
          </div>
        ) : null}
        <span className="message-time-right">{timestamp}</span>
      </div>
    </div>
  );
};

export default MessageCard;
