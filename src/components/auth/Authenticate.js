import React, { useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import { sendAppLoginData } from "../../modules/services/services";
import "./Authenticate.css";

const Authenticate = (props) => {
  const { user, getTokenSilently, appInitOptions } = useAuth0();
  const { postNewErrorLog } = useErrorLog();
  const [email, setEmail] = useState(user.email);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const { setAuthUser, setAuthToken, setAuthUserData } = useAuthUser();
  const { sendLoginInfo, postAppLoginDataActivityLog } = useActivityLog();
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState("");
  const [appLoginData, setAppLoginData] = useState([]);
  const [isLoginError, setIsLoginError] = useState(false); // Error State
  const [isValidatingEmail, setIsValidatingEmail] = useState(false); // spinner
  const [emailValidationCheck, setEmailValidationCheck] = useState(false);  // check icon
  const [errorMessage, setErrorMessage] = useState('');   // Error message
  var appInitOptionsCredentials = props.initCredentials;

  const showError = (message) => {
    setIsValidatingEmail(false);
    setIsLoginError(true);
    setErrorMessage(message);
  };

  const attempts = useCallback(() => {
    setLoginAttempts(loginAttempts + 1);
  }, [loginAttempts]);

  const loginSubmit = async (e) => {
    setIsLoginError(false);
    setIsValidatingEmail(true);
    e.preventDefault();
    var csrfCookie = getCookie("csrftoken");

    var userCredentials = {
      email: email,
      id_token: sessionStorage.getItem("IdToken"),
      uid: user.sub,
      csrf_token: csrfCookie,
      extra_data: user,
    };
    try {
      var login = await userManager.login(userCredentials);
    } catch (error) {
      setIsLoading(false);
      showError("Could not match email. Please try again or contact support.");
      postNewErrorLog(error, "Authenticate.js", "login");
    }
    if (login.valid === true) {
      setIsValidatingEmail(false);
      setIsLoginError(false);
      setEmailValidationCheck(true);
      var loginData = {
        user_id: login.id,
        email: login.email,
        browser: props.browserData,
        recent_attempts: loginAttempts,
        version: props.userAgentData,
        platform: props.platformOS,
        app_code_name: props.appCodeNameData,
        id_token: login.management_user,
      };

      var appLoginPayload = {
        recent_attempts: loginAttempts,
        sessionId: login.session,
      };

      try {
        var loginInfo = await sendLoginInfo(loginData);
      } catch (error) {
        setIsLoading(false);
        showError("Login Info Error. Please contact support.");
        postNewErrorLog(error, "Authenticate.js", "sendLoginInfo");
      }

      try {
        setIsLoginError(false);
        setEmailValidationCheck(false);
        setIsLoading(true);
        var appLoginResult = await sendAppLoginData(appLoginPayload);
      } catch (error) {
        setIsLoading(false);
        showError("Oops! Something went wrong. Please try again.");
        postNewErrorLog(error, "Authenticate.js", "appLoginData");
      }

      userManager
        .setUserAsActive({ is_currently_active: "True" }, login.id, getTokenSilently)
        .then((resp) => {
          setIsActive(resp);
          setAppLoginData(appLoginResult);
          setAuthUser(login);
          setAuthToken(login.QuantumToken);
        })
        .catch((error) => {
          setIsLoading(false);
          showError("Oops! Something went wrong. Please try again.");
          postNewErrorLog(error, "Authenticate.js", "userManager.setUserAsActive");
        });

      // Calling function that sets the token in session storage, and sets isLogged in to true.
      props.setDjangoToken(login);
      sessionStorage.setItem("sessionId", login.session);
      appInitOptionsCredentials["django_token"] = login.QuantumToken;
      appInitOptionsCredentials["session_id"] = login.session;

      try {
        var authCredentialsResult = await userManager.postInitAppOptions(appInitOptionsCredentials);
      } catch (error) {
        setIsLoading(false);
        showError("Oops! Something went wrong. Please try again.");
        postNewErrorLog(error, "Authenticate.js", "userManager.setUserAsActive");
      }

      try {
        var loginActivityLog = await postAppLoginDataActivityLog({ "Confirm Button": "modal__btn-primary" }, props, login.id, "Authenticate.js", "sendAppLoginData");
      } catch (error) {
        postNewErrorLog(error, "Authenticate.js", "loginSubmit/postAppLoginDataActivityLog");
      }

      const userContextData = {
        isActive: isActive,
        appLoginData: appLoginData,
        initOptions: appInitOptions,
        loginActivityLog: true,
        loginActivityLogData: loginActivityLog,
        credentials: authCredentialsResult,
        userLoginData: loginInfo
      }
      setAuthUserData(userContextData);
      setIsLoading(false);
      props.history.push("/home");
    } else {
      setIsLoading(false);
      showError("Could not match email. Please try again.");
      const error = {
        message: "Final Validation Error. Login was not valid.",
        stack: "loginSubmit/userManager.login>TEST"
      }
      postNewErrorLog(error, "Authenticate.js", "loginSubmit/ userManager.login - valid returned false - Error validating data");
    }
  };

  function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(";");
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
        console.log("c", cookie);
      }
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }


  if (isLoading) {
    return (
      <div className="loading fade_in">
        <div className="loading-text">
          <span className="loading-text-words">L</span>
          <span className="loading-text-words">O</span>
          <span className="loading-text-words">A</span>
          <span className="loading-text-words">D</span>
          <span className="loading-text-words">I</span>
          <span className="loading-text-words">N</span>
          <span className="loading-text-words">G</span>
        </div>
      </div>
    );
  }


  return (
    <div className="modal micromodal-slide" id="modal-1" aria-hidden="true">
      <div className="modal__overlay" tabIndex="-1" data-micromodal-close>
        <div className="auth_modal__container" role="dialog" aria-modal="true" aria-labelledby="modal-1-title">
          <header className="auth_modal__header">
            <h2 className="auth_modal__title" id="modal-1-title">
              Confirm Email To Login
            </h2>
            <button className="auth_modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>

          <main className="auth_modal__content" id="modal-1-content">
            <form className="new_form" id="auth_modal" onSubmit={loginSubmit}>
              <div className="auth_fieldset_container">
                <fieldset className="auth_new_form">
                  <label className="auth_label" htmlFor="email">Email: </label>
                  <input
                    required
                    className="auth_input"
                    id="email"
                    type="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </fieldset>
              </div>
              {isValidatingEmail ? (
                <div className="validating_email_container">
                  <div id="auth_spinner"></div>
                </div>
              ) : null}
              {isLoginError ? (
                <div className="error_message_container">
                  <i id="fa_triangle" className="fas fa-exclamation-triangle"></i>
                  <div className="error_message">{errorMessage}</div>
                </div>
              ) : null}
              {emailValidationCheck ? (
                <div className="success_check_wrapper">
                  <i id="auth_check" className="fas fa-check-circle"></i>
                </div>
              ) : null}
              <footer className="auth_modal__footer">
                <button id="auth_modal__btn-primary" type="submit" style={{ marginRight: "8px" }} onClick={attempts}>
                  Confirm
                </button>
              </footer>
            </form>

            <div className="signature">
              <p id="signature_auth_modal">
                Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                <i className="fas fa-trademark"></i>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Authenticate;
