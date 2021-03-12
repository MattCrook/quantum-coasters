import React, { useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import { confirmAlert } from "react-confirm-alert";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import { sendAppLoginData } from "../../modules/services/services";
import "./Register.css";

const Register = (props) => {
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  const {
    user,
    transactions,
    loading,
    isAuthenticated,
    djangoRestAuthLogout,
    logout,
    clearStorage,
    getTokenSilently,
    appInitOptions,
  } = useAuth0();
  var appInitOptionsCredentials = props.initOptions
  const { setAuthToken, setAuthUser, authUser, userProfile, setAuthUserData } = useAuthUser();
  const { postActivityLogRegistration, sendLoginInfo } = useActivityLog();
  const { postNewErrorLog } = useErrorLog();
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [authUserAppLoginData, setAuthUserAppLoginData] = useState([]);
  const [isActive, setIsActive] = useState('');
  const [isLoginError, setIsLoginError] = useState(false); // Error State
  const [isValidating, setIsValidating] = useState(false); // spinner
  const [errorMessage, setErrorMessage] = useState('');   // Error message
  const [validationCheck, setValidationCheck] = useState(false);  // check icon
  var appInitOptionsCredentials = props.initCredentials;
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    address: "",
    auth0_identifier: user.sub.replace("|", "."),
    uid: user.sub,
    provider: "",
    id_token: "",
  });

  const showError = (message) => {
    setIsValidating(false);
    setIsLoginError(true);
    setErrorMessage(message);
  };

  const attempts = useCallback(() => {
    setLoginAttempts(loginAttempts + 1);
  }, [loginAttempts]);

  const handleAuthUserInputChange = (e) => {
    const stateToChange = { ...formData };
    stateToChange[e.target.id] = e.target.value;
    setFormData(stateToChange);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    var csrfCookie = getCookie("csrftoken");

    if (
      formData.first_name === "" ||
      formData.last_name === "" ||
      formData.username === "" ||
      formData.address === ""
    ) {
      window.alert("Please fill out all form fields.");
    } else {
      confirmAlert({
        title: "Profile Complete! You can edit the information anytime.",
        message: "You can start recording your coaster credits!",
        buttons: [
          {
            label: "Ok",
            onClick: async () => {
              setIsLoginError(false);
              setIsValidating(true);

              const newUserObject = {
                first_name: formData.first_name.trim(),
                last_name: formData.last_name.trim(),
                username: formData.username.trim(),
                email: formData.email.trim(),
                address: formData.address.trim(),
                auth0_identifier: user.sub.replace("|", "."),
                uid: user.sub,
                id_token: sessionStorage.getItem("IdToken"),
                extra_data: user,
                transactions: transactions,
                csrf_token: csrfCookie,
              };

              try {
                // setIsLoading(true);
                var registeredUser = await userManager.register(newUserObject);
                // Django User is object I specified to come back from API in register.py
                if ("DjangoUser" in registeredUser && registeredUser.DjangoUser.valid === true) {
                  setIsValidating(false);
                  setIsLoginError(false);
                  setValidationCheck(true);

                  const userLoginData = {
                    user_id: registeredUser.DjangoUser.id,
                    email: registeredUser.DjangoUser.email,
                    browser: props.browserData,
                    recent_attempts: loginAttempts,
                    version: props.userAgentData,
                    platform: props.platformOS,
                    app_code_name: props.appCodeNameData,
                    id_token: registeredUser.DjangoUser.management_user,
                  };

                  var appLoginPayload = {
                    recent_attempts: loginAttempts,
                    sessionId: registeredUser.DjangoUser.session,
                  }

                  try {
                    var loginInfo = await sendLoginInfo(userLoginData);
                  } catch (error) {
                    setIsLoading(false);
                    showError("Registration Error. Please contact support.");
                    postNewErrorLog(error, "Register.js", "sendLoginInfo");
                  }

                  try {
                    setIsLoginError(false);
                    setValidationCheck(false);
                    setIsLoading(true);
                    var appLoginData = await sendAppLoginData(appLoginPayload);
                  } catch (error) {
                    setIsLoading(false);
                    showError("Oops! Something went wrong. Please try again.");
                    postNewErrorLog(error, "Register.js", "appLoginData");
                  }

                  userManager
                    .setUserAsActive({ is_currently_active: "True" }, registeredUser.DjangoUser.id, getTokenSilently)
                    .then((resp) => {
                      setIsActive(resp);
                      setAuthUserAppLoginData(appLoginData);
                      setAuthUser(registeredUser.DjangoUser);
                      setAuthToken(registeredUser.DjangoUser.QuantumToken);
                    })
                    .catch((error) => {
                      setIsLoading(false);
                      showError("Oops! Something went wrong. Please try again.");
                      postNewErrorLog(error, "Register.js", "userManager.setUserAsActive");
                    });

                  // Setting AuthUser from props passed from App to Application Views to Register.
                  // Setting the user high up in app to then filter back down.
                  // Calling function that sets the token in session storage, and sets isLogged in to true.
                  props.setDjangoToken(registeredUser.DjangoUser);
                  sessionStorage.setItem("sessionId", registeredUser.DjangoUser.session);
                  appInitOptionsCredentials['django_token'] = registeredUser.DjangoUser.QuantumToken;
                  appInitOptionsCredentials['session_id'] = registeredUser.DjangoUser.session;

                  try {
                    var authCredentialsResult = await userManager.postInitAppOptions(appInitOptionsCredentials);
                  } catch (error) {
                    setIsLoading(false);
                    showError("Oops! Something went wrong. Please try again.");
                    postNewErrorLog(error, "Register.js", "authCredentialsResult - userManager.postInitAppOptions");
                  }

                  try {
                    const target = { registerButton: "register-create-btn" };
                    var registerActivityLog = await postActivityLogRegistration(target, props, registeredUser.DjangoUser.id);
                  } catch (error) {
                    postNewErrorLog(error, "Register.js", "handleFormSubmit - loginActivityLog - postAppLoginDataActivityLog");
                  }

                  // Function to POST to rest-auth verify email endpoint with the key returned from register.
                  // const sendEmailVerification = await userManager.verifyEmail(registeredUser.DjangoUser.QuantumToken);
                  const userContextData = {
                    isActive: isActive,
                    appLoginData: authUserAppLoginData,
                    initOptions: appInitOptions,
                    registerActivityLog: true,
                    registerActivityLog: registerActivityLog,
                    credentials: authCredentialsResult,
                    userLoginData: loginInfo
                  };

                  setAuthUserData(userContextData);
                  setIsLoading(false);
                  props.history.push("/home");
                } else {
                  setIsLoading(false);
                  showError("There was a problem registering. Please try again, go back to Home, or contact support.");
                  const err = {
                    message: "Final Validation Error. Login was not valid. DjangoUser not in Response.",
                    stack: "handleFormSubmit/userManager.registerUser"
                  }
                  postNewErrorLog(err, "Register.js", "registerUser");
                }
              } catch (err) {
                setIsLoading(false);
                showError("There was a problem registering. Please contact Support.")
                console.log(err)
                postNewErrorLog(err, "Register.js", "handleFormSubmit - registerUser");
              }
            },
          },
          {
            label: "Cancel",
            onClick: () => {},
          },
        ],
        closeOnClickOutside: true,
        onClickOutside: () => {},
        onKeypressEscape: () => {},
      });
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="loading_container">
  //       {/* <div className="loading_pop_up">Loading...</div> */}
  //       <div className="spinner icon-spinner-2" aria-hidden="true"></div>
  //     </div>
  //   );
  // }

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
    <>
      <nav id="home_navbar_container" className="navbar is-dark">
        <div className="navbar-menu is-active">
          <button className="home-logo">Quantum Coasters</button>
          {!loading && user && isAuthenticated && (
            <>
              <div className="navbar-end">
                {authUser.email ? (
                  <button className="navbar-item-home-name">
                    {authUser.first_name} {authUser.last_name}
                  </button>
                ) : (
                  <div className="navbar_item_home_user_name">{user.email}</div>
                )}
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
      <form className="register-form" onSubmit={handleFormSubmit}>
        <fieldset className="fs-register-form">
          <div className="register-title-container">
            <div className="register-title">Complete Your Profile</div>
          </div>
          <div className="profile-create-form">
            <label className="register_form_label" htmlFor="first_name">
              First Name
            </label>
            <input
              className="input_register"
              onChange={handleAuthUserInputChange}
              type="text"
              id="first_name"
              required
              autoFocus
            />

            <label className="register_form_label" htmlFor="last_name">
              Last Name
            </label>
            <input
              className="input_register"
              onChange={handleAuthUserInputChange}
              type="text"
              id="last_name"
              required
            />

            <label className="register_form_label" htmlFor="username">
              Username
            </label>
            <input className="input_register" onChange={handleAuthUserInputChange} type="text" id="username" required />

            <label id="register_form_address_label" className="register_form_label" htmlFor="address">
              Address
            </label>
            <input className="input_register" onChange={handleAuthUserInputChange} type="text" id="address" required />

            <button className="register-create-btn" type="submit" disabled={isLoading} onClick={attempts}>
              Register
            </button>
          </div>
          <div className="signature">
            <p id="signature_font_register_form">
              Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
            </p>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Register;
