import React from "react";
import "./Messages.css";

const MessageCard = (props) => {
  let profilePic = "";
  let timestamp = "";
  const text = props.message.message;
  const profile = props.userProfile.userprofile;
  const messageUserProfileId = props.message.user_id;

  if (profile) {
    props.userProfile.userprofile.picUrl !== null
      ? (profilePic = props.userProfile.userprofile.picUrl)
      : (profilePic = props.defaultProfilePicture);

    props.message.timestamp !== null
      ? (timestamp = props.message.timestamp)
      : (timestamp = new Date().toLocaleString());
  }

  return (
    <>
      <div className="message-card">
        <div className="card-content, message-container">
          {profilePic ? (
            <img id="profile-pic" src={profilePic} alt="My Avatar" />
          ) : (
            <img
              id="google-profile-pic"
              src={props.defaultProfilePicture}
              alt="My Avatar"
            />
          )}
          <p>
            <strong className="message-name">
              {props.userProfile.first_name}
            </strong>
            : {text}
          </p>
          {profile ? (
            messageUserProfileId === profile.id ? (
              <button
                data-testid="edit-testid"
                className="edit-outline-icon"
                onClick={() => props.setMessageToEdit(props.message)}
              >
                Edit
              </button>
            ) : null
          ) : null}
          <span className="message-time-right">{timestamp}</span>
        </div>
      </div>
    </>
  );
};

export default MessageCard;

{
  /*
  If the active user id === the message's user id
  then output the edit button
*/
}
