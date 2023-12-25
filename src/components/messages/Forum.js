import React, { useEffect, useState, useRef } from "react";
import messageManager from "../../modules/messages/messageManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import MessagePreviewCard from "./general/pages/MessagePreviewCard";
import FeedbackModal from "../modals/FeedbackModal";
import BugReportModal from "../modals/BugModal";
import { postFeedback, postBugReport } from "../../modules/services/services";
// import userManager from "../../modules/users/userManager";
// import MessageCard from "./MessageCard";
// import MessageForm from "./MessageForm";
// import { useErrorLog } from "../../contexts/ErrorLogContext";
import "./Messages.css";
import "./styles/Forum.css";

const Forum = (props) => {
  const URL = process.env.REACT_APP_SERVER_URL;
  const defaultProfilePicture = "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg";
  const { authUser, userProfile } = useAuthUser();
  const { user, loading, logout, clearStorage, djangoRestAuthLogout } = useAuth0();
  const { postNewErrorLog } = useErrorLog();
  const { postFeedbackActivityLog, postBugReportActivityLog } = useActivityLog();
  const [messagesToPreview, setMessagesToPreview] = useState([]);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const feedbackComment = useRef();
  const feedbackSubject = useRef();
  const bugTitle = useRef();
  const bugDescription = useRef();

  const toggleProfileDropdown = () => setIsProfileDropdown(!isProfileDropdown);


  const renderGroupChat = (e, userId) => {
    e.preventDefault();
    e.stopPropagation();
    // const target = `${URL}/authenticate_for_group_chat/${userId}`;
    // If index. wil hit index first so always be un authenticated, so will always show the login page after first click.
    // /group_chat/ take user to ?next=/group_chat/ automatically running the social auth pipeline in the background.
    const target = `${URL}/index/`;

    // const target = `${URL}/group_chat/`;
    // const target = `${URL}/login/auth0?next=/group_chat/`
    window.location.href = target;
  };


  const renderPrivateChat = (e, userId) => {
    e.preventDefault();
    e.stopPropagation();
    // const target = `${URL}/private_chat/${userId}`;
    const target = `${URL}/private_chat/`;
    window.location.href = target;
  };

  // const renderTemplate = () => {
  //   const target = `${URL}/chat`;
  //   window.location.href = target;
  // };

  // const renderGeneralChatRoom = () => {
  //   const target = `${URL}/chat/general/`;
  //   window.location.href = target;
  // };

  const sortByDate = (messages) => {
    const sorted = messages.sort((a, b) => {
      const dateA = new Date(a.timestamp);
      const dateB = new Date(b.timestamp);
      return dateA - dateB;
    });
    return sorted;
  };

  useEffect(() => {
    const messagesForPreview = async () => {
      const allMessages = await messageManager.getAllMessages();
      const sortedMessages = sortByDate(allMessages);
      const messagesNewestToOldest = sortedMessages.reverse();
      const messagesToShow = messagesNewestToOldest.slice(0, 5);
      const sortBackToOldestToNewest = messagesToShow.reverse();
      setMessagesToPreview(sortBackToOldestToNewest);
    };
    messagesForPreview();
  }, []);


  const handleOpenFeedBack = () => {
    setFeedbackModalOpen(true);
  };

  const handleCloseFeedBack = () => {
    setFeedbackModalOpen(false);
  };

  const handleOpenBugReport = () => {
    setBugReportModalOpen(true);
  };

  const handleCloseBugReport = () => {
    setBugReportModalOpen(false);
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    const feedback = {
      subject: feedbackSubject.current.value,
      comment: feedbackComment.current.value,
    };
    postFeedback(feedback)
      .then(() => {
        alert("Thanks for your feedback! Your submission has been received.");
        postFeedbackActivityLog(e, props, authUser.id, "Forum.js", "FeedbackModal.js").then(() => {
          setFeedbackModalOpen(false);
          setIsProfileDropdown(false);
        });
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "Forum.js", "handleSubmitFeedback");
      });
  };

  const handleSubmitBug = (e) => {
    e.preventDefault();
    const bug = {
      title: bugTitle.current.value,
      description: bugDescription.current.value,
    };
    postBugReport(bug)
      .then(() => {
        alert("Thanks for finding a bug! Your submission has been received.");
        postBugReportActivityLog(e, props, authUser.id, "Forum.js", "BugModal.js").then(() => {
          setBugReportModalOpen(false);
          setIsProfileDropdown(false);
        });
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "Forum.js", "handleSubmitBug");
      });
  };

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
              <div className="navbar-item-name">
                {authUser.first_name} {authUser.last_name}
              </div>
              <button className="profile_dropdown" onClick={() => toggleProfileDropdown()}>
                {userProfile.image ? (
                  <img id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
                ) : (
                  <img id="profile-pic" src={defaultProfilePicture} alt="My Avatar" />
                )}
              </button>
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
      {isProfileDropdown ? (
        <div className="profile_dropdown_container">
          <>
            <div className="profile_dropdown_row">
              <div className="profile_dropdown_item" onClick={() => props.history.push("/home")}>
                Home
              </div>
              <i className="fas fa-home"></i>
              {/* <i className="fas fa-long-arrow-alt-right"></i> */}
            </div>
            <div className="profile_dropdown_row">
              <div className="profile_dropdown_item" onClick={() => props.history.push(`/profile/${authUser.id}`)}>
                Edit Account
              </div>
              <i className="fas fa-user-edit"></i>
            </div>
            <div className="profile_dropdown_row">
              <div className="profile_dropdown_item" onClick={() => handleOpenFeedBack()}>
                Give Feedback
              </div>
              <i className="far fa-comments"></i>
            </div>
            <div className="profile_dropdown_row">
              <div className="profile_dropdown_item" onClick={() => handleOpenBugReport()}>
                Report a Bug
              </div>
              <i className="fas fa-bug"></i>
            </div>
          </>
        </div>
      ) : null}
      <FeedbackModal
        authUser={authUser}
        feedbackModalOpen={feedbackModalOpen}
        handleOpenFeedBack={handleOpenFeedBack}
        handleCloseFeedBack={handleCloseFeedBack}
        feedbackComment={feedbackComment}
        feedbackSubject={feedbackSubject}
        handleSubmitFeedback={handleSubmitFeedback}
        {...props}
      />
      <BugReportModal
        bugReportModalOpen={bugReportModalOpen}
        handleOpenBugReport={handleOpenBugReport}
        handleCloseBugReport={handleCloseBugReport}
        bugDescription={bugDescription}
        bugTitle={bugTitle}
        handleSubmitBug={handleSubmitBug}
        {...props}
      />
      <div className="main_container">
        <div className="forum_title_container">
          <div className="forum_title">Quantum Forum</div>
          <div className="forum_description">Welcome to the Quantum Forum! Choose a channel and start chatting.</div>
        </div>
        <div className="forum_header_container">
          <div className="header_section_button" onClick={() => props.history.push("/messages")}>
            General
          </div>
          <div className="header_section_button" onClick={(e) => renderGroupChat(e, authUser.id)}>
            Group Chat/ Channels
          </div>
          <div className="header_section_button" onClick={(e) => renderPrivateChat(e, authUser.id)}>
            Private Message
          </div>

          {/* <div className="header_section_button" onClick={(e) => renderTemplate(e)}>Test</div>
          <div className="header_section_button" onClick={(e) => renderGeneralChatRoom(e)}>Test General</div> */}
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
              <div className="group_chat_description">Choose a Quantum friend/ enthusiast to private message.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
