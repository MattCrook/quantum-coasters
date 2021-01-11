import React, { useEffect, useState } from "react";
import messageManager from "../../modules/messages/messageManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useAuthUser } from "../../contexts/AuthUserContext";
import MessagePreviewCard from "./general/pages/MessagePreviewCard";
// import userManager from "../../modules/users/userManager";
// import MessageCard from "./MessageCard";
// import MessageForm from "./MessageForm";
// import { useErrorLog } from "../../contexts/ErrorLogContext";
import "./Messages.css";
import "./styles/Forum.css";

const Forum = (props) => {
  const URL = process.env.REACT_APP_SERVER_URL;
  const { authUser, userProfile } = useAuthUser();
  const { user, loading, logout, clearStorage, djangoRestAuthLogout } = useAuth0();
  // const [messages, setMessages] = useState([]);
  const [messagesToPreview, setMessagesToPreview] = useState([]);
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

  const renderGeneralMessages = () => {
    props.history.push("/messages");
  };

  const renderTemplate = () => {
    const target = `${URL}/chat`;
    window.location.href = target;
  }

  const renderGeneralChatRoom = () => {
    const target = `${URL}/chat/general/`;
    window.location.href = target;
  }

  const sortByDate = (messages) => {
    const sorted = messages.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateA - dateB;
    });
    return sorted;
  }

  useEffect(() => {
    const messagesForPreview = async () => {
      const allMessages = await messageManager.getAllMessages();
      // setMessages(allMessages);
      const sortedMessages = sortByDate(allMessages);
      const messagesNewestToOldest = sortedMessages.reverse();
      const messagesToShow = messagesNewestToOldest.slice(0, 5);
      const sortBackToOldestToNewest = messagesToShow.reverse()
      setMessagesToPreview(sortBackToOldestToNewest);
    };
    messagesForPreview();
  }, []);

  return (
    <>
      <nav id="nav_forum_container" className="navbar is-dark">
        <div className="forum_container_1">
          <div className="navbar-brand">
            <button id="quantum_logo_forum" className="navbar-item">
              Quantum Coasters
            </button>
          </div>
        </div>

        <div className="forum_container_2">
          {!loading && user && (
            <>
              <button className="navbar-item-name">
                {authUser.first_name} {authUser.last_name}
              </button>
              {userProfile.image ? (
                <img id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
              ) : (
                <img id="profile-pic" src={defaultProfilePicture} alt="My Avatar" />
              )}
              <button
                onClick={() => djangoRestAuthLogout(logout, clearStorage, authUser)}
                className="navbar-item-logout-btn"
              >
                Logout
              </button>
              <i className="fas fa-sign-out-alt"></i>
              <hr />
            </>
          )}
        </div>
      </nav>
      <div className="main_container">
        <div className="forum_title_container">
          <div className="forum_title">Quantum Forum</div>
          <div className="forum_description">Welcome to the Quantum Forum! Choose a channel and start chatting.</div>
        </div>
        <div className="forum_header_container">
          <div className="header_section_button" onClick={(e) => renderGeneralMessages(e)}>
            General
          </div>
          <div className="header_section_button">Start A Group Chat</div>
          <div className="header_section_button" onClick={(e) => renderTemplate(e)}>Test</div>
          <div className="header_section_button">Private Message</div>
          <div className="header_section_button" onClick={(e) => renderGeneralChatRoom(e)}>Test General</div>


        </div>

        <div className="forum_body_container">
          <div className="general_description_container">
            <div className="general_description_title">
              <div className="general_description">
                The General Forum is a place for all Quantum users to access and talk to each other in one central
                place.{" "}
              </div>
            </div>
            <div className="general">Live Look at the General Chat Forum</div>
            <div className="live_look_container">
              <div className="general_forum_title">Forum</div>
              <div className="forum_preview_wrapper">
                {messagesToPreview.map((message) => (
                  <MessagePreviewCard
                    key={message.id}
                    message={message}
                    loading={loading}
                    userProfile={userProfile}
                    defaultProfilePicture={defaultProfilePicture}
                    {...props}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="group_chat_container">
            <div className="group_chat_description_title">
              <div className="group_chat_description">
                By starting a Group Chat you can invite your Quantum friends and enthusiasts to a private chat room/
                forum to talk about your favorite rides and theme parks.
              </div>
            </div>
          </div>

          <div className="group_chat_container">
            <div className="group_chat_description_title">
              <div className="group_chat_description">
                Choose a Quantum friend/ enthusiast to private message.
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Forum;
