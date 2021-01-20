import React, { useState, useEffect, useRef } from "react";
import messageManager from "../../../modules/messages/messageManager";
import MessageCard from "./pages/MessageCard";
import MessageForm from "./MessageForm";
import { useAuth0 } from "../../../contexts/react-auth0-context";
import { useAuthUser } from "../../../contexts/AuthUserContext";
import { useErrorLog } from "../../../contexts/ErrorLogContext";
import { useActivityLog } from "../../../contexts/ActivityLogContext";
import FeedbackModal from "../../modals/FeedbackModal";
import BugReportModal from "../../modals/BugModal";
import { postBugReport, postFeedback } from "../../../modules/services/services";
import "../Messages.css";

const MessageList = (props) => {
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  const { user, loading, logout, clearStorage, djangoRestAuthLogout } = useAuth0();
  const { authUser, userProfile } = useAuthUser();
  const { postNewErrorLog } = useErrorLog();
  const { postFeedbackActivityLog, postBugReportActivityLog } = useActivityLog();
  const [allMessages, setAllMessages] = useState([]);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const feedbackComment = useRef();
  const feedbackSubject = useRef();
  const bugTitle = useRef();
  const bugDescription = useRef();
  const [messageToEdit, setMessageToEdit] = useState({
    user_id: "",
    text: "",
    timestamp: "",
  });
  const userProfileId = userProfile.id;
  // const [paginatedMessages, setPaginatedMessages] = useState([]);

  const toggleProfileDropdown = () => setIsProfileDropdown(!isProfileDropdown);

  const getMessages = async () => {
    try {
      const messages = await messageManager.getAllMessages();
      setAllMessages(messages);
    } catch (error) {
      postNewErrorLog(error, "Messages.js", "getMessages");
    }
  };

  useEffect(() => {
    getMessages();
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
        postFeedbackActivityLog(e, props, authUser.id, "Messages.js", "FeedbackModal.js").then(() => {
          setFeedbackModalOpen(false);
          setIsProfileDropdown(false);
        });
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "Messages.js", "handleSubmitFeedback");
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
        postBugReportActivityLog(e, props, authUser.id, "Messages.js", "BugModal.js").then(() => {
          setBugReportModalOpen(false);
          setIsProfileDropdown(false);
        });
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "Messages.js", "handleSubmitBug");
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
            </>
          )}
        </div>
      </nav>
      {isProfileDropdown ? (
        <div className="profile_dropdown_container">
          <>
            <div className="profile_dropdown_row">
              <div className="profile_dropdown_item" onClick={() => props.history.push("/forum")}>
                Back to Forum
              </div>
              <i className="fas fa-long-arrow-alt-right"></i>
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

      <div className="chat-wrapper">
        <div className="chat-fixed-height-container">
          <div id="chat-headerContainer">
            <div className="forum-header">
              <div className="general_forum_messages_title">General Quantum Forum</div>
            </div>
          </div>
          <div className="chat-ScrollToBottom">
            <div className="message-container-cards">
              {allMessages
                .sort(function (a, b) {
                  return new Date(a.timestamp) - new Date(b.timestamp);
                })
                .map((message) => (
                  <MessageCard
                    key={message.id}
                    message={message}
                    setMessageToEdit={setMessageToEdit}
                    userProfile={userProfile}
                    authUser={authUser}
                    defaultProfilePicture={defaultProfilePicture}
                    loading={loading}
                    {...props}
                  />
                ))}
            </div>
          </div>
          <div className="container-form">
            <MessageForm
              userProfile={userProfile}
              userProfileId={userProfileId}
              // paginatedMessages={paginatedMessages}
              messageToEdit={messageToEdit}
              setMessageToEdit={setMessageToEdit}
              setAllMessages={setAllMessages}
              getMessages={getMessages}
              {...props}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MessageList;

// const getMessages = async () => {
//   try {
//     const messages = await messageManager.getAllMessages();
//     setAllMessages(messages);
//     const sortedMessages = sortByDate(messages);
//     const messagesNewestToOldest = sortedMessages.reverse();
//     const messagesToShow = messagesNewestToOldest.slice(0, 7);
//     const sortBackToOldestToNewest = messagesToShow.reverse()
//     setPaginatedMessages(sortBackToOldestToNewest);
//   } catch (error) {
//     postNewErrorLog(error, "Messages.js", "getMessages");
//   }
// };

// useEffect(() => {
//   getMessages();
// }, []);

// function sortByDate(messages) {
//   console.log(messages)
//   const sorted = messages.sort((a, b) => {
//     const dateA = new Date(a.timestamp);
//     const dateB = new Date(b.timestamp);
//     return dateA - dateB;
//   });
//   return sorted;
// }
