import React, { useState, useRef } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import FeedbackModal from "../modals/FeedbackModal";
import BugReportModal from "../modals/BugModal";
import { postBugReport, postFeedback } from "../../modules/services/services";

const NavHeader = (props) => {
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  const { loading, user, isAuthenticated, clearStorage, djangoRestAuthLogout, logout } = useAuth0();
  const { authUser, userProfile } = useAuthUser();
  const { postNewErrorLog } = useErrorLog();
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const feedbackComment = useRef();
  const feedbackSubject = useRef();
  const [bugReportModalOpen, setBugReportModalOpen] = useState(false);
  const bugTitle = useRef();
  const bugDescription = useRef();

  const toggleProfileDropdown = () => setIsProfileDropdown(!isProfileDropdown);

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
        setFeedbackModalOpen(false);
        setIsProfileDropdown(false);
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "NavHeader.js", "handleSubmitFeedback");
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
        alert("Thanks for your feedback! Your submission has been received.");
        setFeedbackModalOpen(false);
        setIsProfileDropdown(false);
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "NavHeader.js", "handleSubmitBug");
      });
  };

  return (
    <>
      <header>
        <nav id="home_navbar_container" className="navbar is-dark">
          <div className="navbar-menu is-active">
            <button className="home-logo">Quantum Coasters</button>
            {!loading && user && isAuthenticated && (
              <>
                <div id="navbar_end" className="navbar-end">
                  {authUser.email ? (
                    <div className="navbar-item-home-name">
                      {authUser.first_name} {authUser.last_name}
                    </div>
                  ) : (
                    <div className="navbar_item_home_user_name">{user.email}</div>
                  )}
                  <button className="nav_profile_dropdown" onClick={() => toggleProfileDropdown()}>
                    {!loading && userProfile.image ? (
                      <img
                        data-testid="home-profile-pic-testid"
                        id="nav-profile-pic"
                        src={userProfile.image.image}
                        alt="My Avatar"
                      />
                    ) : (
                      <img
                        data-testid="home-profile-pic-testid"
                        id="nav-profile-pic"
                        src={defaultProfilePicture}
                        alt="My Avatar"
                      />
                    )}
                  </button>
                  <div className="logout_btn_home_container">
                    <button
                      id="nav_header_logout_btn"
                      onClick={() => djangoRestAuthLogout(logout, clearStorage, authUser)}
                      // className="logout-navbar-item"
                      data-testid="logout-btn-testid"
                    >
                      Logout
                    </button>
                    <i className="fas fa-sign-out-alt"></i>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>
      </header>
      {isProfileDropdown ? (
        <div className="nav_profile_dropdown_container">
          <>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => props.history.push("/home")}>
                Home
              </div>
              {/* <i className="fas fa-long-arrow-alt-right"></i> */}
              <i className="fas fa-home"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => props.history.push(`/profile/${authUser.id}`)}>
                Edit Account
              </div>
              <i className="fas fa-user-edit"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => handleOpenFeedBack()}>
                Give Feedback
              </div>
              <i className="far fa-comments"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => handleOpenBugReport()}>
                Report a Bug
              </div>
              <i className="fas fa-bug"></i>
            </div>
          </>
        </div>
      ) : null}
      <FeedbackModal
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
    </>
  );
};

export default NavHeader;
