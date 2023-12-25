import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { Link } from "react-router-dom";
import Authenticate from "../auth/Authenticate";
import MicroModal from "micromodal";
import FeedbackModal from "../modals/FeedbackModal";
import BugReportModal from "../modals/BugModal";
import { postFeedback, postBugReport } from "../../modules/services/services";
import "bulma/css/bulma.css";
import "./Home.css";
import "../auth/Authenticate.css";

MicroModal.init({
  openTrigger: "data-micromodal-trigger",
  closeTrigger: "data-micromodal-close",
  openClass: "is-open",
  disableScroll: true,
  disableFocus: false,
  awaitOpenAnimation: true,
  awaitCloseAnimation: false,
  debugMode: true,
});

const Home = (props) => {
  const defaultProfilePicture = "https://cdn.vectorstock.com/i/preview-1x/70/84/default-avatar-profile-icon-symbol-for-website-vector-46547084.jpg";
  const { loading, user, logout, clearStorage, isAuthenticated, djangoRestAuthLogout } = useAuth0();
  const { authUser, userProfile } = useAuthUser();
  const { postNewErrorLog } = useErrorLog();
  const { postFeedbackActivityLog, postBugReportActivityLog } = useActivityLog();
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn, hasLoggedIn } = props;
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
        postFeedbackActivityLog(e, props, authUser.id, "FeedbackModal.js", "Home.js").then(() => {
          setFeedbackModalOpen(false);
          setIsProfileDropdown(false);
        });
      })
      .catch((error) => {
        console.log(error);
        postNewErrorLog(error, "Home.js", "handleSubmitFeedback");
      });
  };

  const handleSubmitBug = (e) => {
    e.preventDefault();
    const bug = {
      title: bugTitle.current.value,
      description: bugDescription.current.value,
    };
    postBugReport(bug).then(() => {
      alert("Thanks for finding a bug! Your submission has been received.");
      postBugReportActivityLog(e, props, authUser.id, "Home.js", "BugModal.js")
        .then(() => {
          setBugReportModalOpen(false);
          setIsProfileDropdown(false);
        })
        .catch((error) => {
          console.log(error);
          postNewErrorLog(error, "Home.js", "handleSubmitBug");
        });
    });
  };

  useEffect(() => {
    if (isAuthenticated && isLoggedIn && props.authToken) {
      setIsLoggedIn(hasLoggedIn());
    } else {
      setIsLoggedIn(hasLoggedIn());
    }
  }, [props, hasLoggedIn, isLoggedIn, isAuthenticated, setIsLoggedIn]);

  const redirectToAdminLogin = () => {
    const Url = process.env.REACT_APP_SERVER_URL;
    const target = `${Url}/admin/login/`;
    window.location.href = target;
  };

  return (
    <>
      <header>
        <nav id="home_navbar_container" className="navbar is-dark">
          <div className="navbar-menu is-active">
            <button className="home-logo">Quantum Coasters</button>
            {!loading && user && isAuthenticated && (
              <>
                <div id="home_nav_bar_end" className="navbar-end">
                  {authUser.email ? (
                    <div className="navbar-item-home-name">
                      {authUser.first_name} {authUser.last_name}
                    </div>
                  ) : (
                    <div className="navbar_item_home_user_name">{user.email}</div>
                  )}
                  <button onClick={() => toggleProfileDropdown()}>
                    {!loading && userProfile.image ? (
                      <img
                        data-testid="home-profile-pic-testid"
                        id="profile-pic"
                        src={userProfile.image.image}
                        alt="My Avatar"
                      />
                    ) : (
                      <img
                        data-testid="home-profile-pic-testid"
                        id="profile-pic"
                        src={defaultProfilePicture}
                        alt="My Avatar"
                      />
                    )}
                  </button>
                  <div className="logout_btn_home_container">
                    <button
                      onClick={() => djangoRestAuthLogout(logout, clearStorage, authUser)}
                      className="logout-navbar-item"
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

        {!loading && isProfileDropdown && isAuthenticated && isLoggedIn ? (
          <div className="home_profile_dropdown_container">
            <>
              <div className="home_profile_dropdown_row">
                <div className="home_profile_dropdown_item" onClick={() => redirectToAdminLogin()}>
                  Admin
                </div>
                <i className="fas fa-user-lock"></i>
              </div>
              <div className="home_profile_dropdown_row">
                <div
                  className="home_profile_dropdown_item"
                  onClick={() => props.history.push(`/profile/${authUser.id}`)}
                >
                  Edit Account
                </div>
                <i className="fas fa-user-edit"></i>
              </div>
              <div className="home_profile_dropdown_row">
                <div className="home_profile_dropdown_item" onClick={() => handleOpenFeedBack()}>
                  Give Feedback
                </div>
                <i className="far fa-comments"></i>
              </div>
              <div className="home_profile_dropdown_row">
                <div className="home_profile_dropdown_item" onClick={() => handleOpenBugReport()}>
                  Report a Bug
                </div>
                <i className="fas fa-bug"></i>
              </div>
            </>
          </div>
        ) : null}

        {!loading && isProfileDropdown && isAuthenticated && !isLoggedIn ? (
          <div className="home_profile_dropdown_container">
            <>
              <div className="home_profile_dropdown_row">
                <div className="home_profile_dropdown_item" onClick={() => redirectToAdminLogin()}>
                  Admin
                </div>
                <i className="fas fa-user-lock"></i>
              </div>
              <div className="home_profile_dropdown_row">
                <div className="home_profile_dropdown_item">
                  Help
                </div>
                <i className="fas fa-question-circle"></i>
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

        <div className="modal_btn_toggle_home">
          {!loading && user && userProfile.id && isAuthenticated && !isLoggedIn ? (
            <>
              <button
                className="modal_sign_in_btn_home"
                onClick={() => MicroModal.init()}
                data-micromodal-trigger="modal-1"
              >
                <i className="fas fa-user-lock"></i>Confirm Email
              </button>
              <Authenticate {...props} />
            </>
          ) : null}
        </div>

        {!authUser.email && !loading && user && isAuthenticated && !isLoggedIn && (
          <>
            <div className="banner-for-complete-profile">
              <h3 className="welcome-greeting" data-testid="welcome-greeting-testid">
                Welcome! Please click the button below and complete your profile to get started using Quantum.
              </h3>
            </div>
          </>
        )}
        <div className="hero is-fullheight">
          {!loading && !authUser.email && isAuthenticated && !isLoggedIn && (
            <Link data-testid="complete-profile-btn-testid" className="complete-profile-link" to="register/">
              Complete Profile
            </Link>
          )}
          {!loading && !authUser.email && !userProfile.id && isAuthenticated && isLoggedIn ? (
            <>
              <div className="edge_case_btns">
                <button
                  data-testid="complete-profile-btn-testid"
                  className="login_alt_edge_case_link"
                  onClick={clearStorage}
                  // onClick={() => djangoRestAuthLogout(logout, clearStorage, authUser)}
                >
                  Back to Login
                </button>
                <Link data-testid="complete-profile-btn-testid" className="register_alt_edge_case_link" to="register/">
                  Register
                </Link>
              </div>
            </>
          ) : null}
          <div className="hero-body bg-img" style={{ marginTop: "20px" }}></div>
        </div>
      </header>
      <div className="signature">
        <p>
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};
export default Home;

// if using the location object, and adding guard, grab the state of userProfile passed thru props (from register)
/* const userProfile = props.location && props.location.state && props.location.state.userProfile */
