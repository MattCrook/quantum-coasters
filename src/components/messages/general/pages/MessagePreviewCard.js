import React from "react";
import "../../styles/Forum.css";

const MessagePreviewCard = (props) => {
  console.log(props)
  const { loading } = props;
  let profilePic = "";
  let timestamp;
  const text = props.message.message;
  //   const messageUserProfileId = props.message.user_id;
  const profile = props.userProfile;
  const name = props.message.user.user.first_name;

  if (!loading && props && profile && profile.image) {
    profile.image ? (profilePic = props.message.user.image.image) : (profilePic = props.defaultProfilePicture);
    props.message.timestamp !== null
      ? (timestamp = props.message.timestamp)
      : (timestamp = new Date().toLocaleString());
  }

  return (
    <>
      <div className="message_card_general">
        <div className="pic_and_name_and_txt_container_general">
          {profilePic ? (
            <img id="profile_pic_general" src={profilePic} alt="My Avatar" />
          ) : (
            <img id="google-profile-pic-general" src={props.defaultProfilePicture} alt="My Avatar" />
            )}
            <div className="name_and_txt_container_general">
            {!loading && profile && profile.user && (
              <>
              <div className="message_name_general">{name} : </div>
                  <div className="message_text_general">{text}
                </div>
                </>
          )}
        <span className="message_time_right_general">{props.message.timestamp}</span>
          </div>
        </div>

        </div>
    </>
  );
};
export default MessagePreviewCard;
