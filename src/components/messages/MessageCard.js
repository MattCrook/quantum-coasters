import React from "react";
import "./Messages.css";
import { useAuth0 } from "../../contexts/react-auth0-context";

const MessageCard = (props) => {
  const { loading } = useAuth0();
  let profilePic = "";
  let timestamp = "";
  const text = props.message.message;
  const messageUserProfileId = props.message.user_id;
  const profile = props.userProfile;
  const name = props.message.user.user.first_name;

  if (!loading && profile && profile.image) {
    profile.image
      ? (profilePic = props.message.user.image.image)
      : (profilePic = props.defaultProfilePicture);
    props.message.timestamp !== null
      ? (timestamp = props.message.timestamp)
      : (timestamp = new Date().toLocaleString());
  }


  return (
    <>
      <div className="message-card">
        <div className="card-content, message-container">
          <div className="pic_and_name_and_txt_container">
          {profilePic ? (
            <img id="profile-pic" src={profilePic} alt="My Avatar" />
            ) : (
              <img
              id="google-profile-pic"
              src={props.defaultProfilePicture}
              alt="My Avatar"
              />
              )}
          {!loading && profile && profile.user && (
            <div className="name_and_txt_container">
                <div className="message_name">{name}</div>:
                <div className="message_text">
                {text}
                </div>
              </div>
            )}
            </div>

          {/* Render edit button if the profile id from API === profile ID from url meaning the currently logged in user */}
          {!loading && profile ? (
            messageUserProfileId === profile.id ? (
              <button
                data-testid="edit-testid"
                className="edit-outline-icon"
                onClick={() => props.setMessageToEdit(props.message)}
              >Edit<i className="far fa-edit"></i></button>
            ) : null
          ) : null}
          <span className="message-time-right">{timestamp}</span>
        </div>
      </div>
    </>
  );
};

export default MessageCard;

/*
  If the active user id === the message's user id
  then output the edit button
*/
