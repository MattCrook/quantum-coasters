import React, { useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import { confirmAlert } from "react-confirm-alert";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import "./Register.css";

const Register = (props) => {
  const { user, transactions, loading, isAuthenticated, djangoRestAuthLogout, logout, clearStorage, getTokenSilently } = useAuth0();
  const { setAuthToken, setAuthUser, authUser, userProfile } = useAuthUser();
  const { postActivityLogRegistration, sendLoginInfo } = useActivityLog();
  const { postNewErrorLog } = useErrorLog();
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    password: user.sub.split("|")[1],
    address: "",
    auth0_identifier: user.sub.replace("|", "."),
    uid: user.sub,
    provider: "",
    id_token: "",
  });
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

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
              setIsLoading(true);
              const newUserObject = {
                first_name: formData.first_name.trim(),
                last_name: formData.last_name.trim(),
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: user.sub.split("|")[1],
                address: formData.address.trim(),
                auth0_identifier: user.sub.replace("|", "."),
                uid: user.sub,
                provider: "auth0",
                id_token: sessionStorage.getItem("IdToken"),
                extra_data: user,
                transactions: transactions,
              };
              try {
                const registerUser = await userManager.register(newUserObject);
                // Django User is object I specified to come back from API in register.py
                if ("DjangoUser" in registerUser) {
                  props.setDjangoToken(registerUser.DjangoUser);
                  setAuthToken(registerUser.DjangoUser.QuantumToken);
                  // Setting AuthUser from props passed from App to Application Views to Register. Setting the user high up in app to then filter back down.
                  setAuthUser(registerUser.DjangoUser);
                  sessionStorage.setItem("sessionId", registerUser.DjangoUser.session);

                  const loginData = {
                    user_id: registerUser.DjangoUser.id,
                    email: registerUser.DjangoUser.email,
                    browser: props.browserData,
                    recent_attempts: loginAttempts,
                    version: props.userAgentData,
                    platform: props.platformOS,
                    app_code_name: props.appCodeNameData,
                    id_token: registerUser.DjangoUser.management_user,
                  };

                  await sendLoginInfo(loginData);
                  await postActivityLogRegistration(props, registerUser.DjangoUser.id);
                  await userManager.setUserAsActive({'is_currently_active': "True"}, registerUser.DjangoUser.id, getTokenSilently)

                  // Function to POST to rest-auth verify email endpoint with the key returned from register.
                  // const sendEmailVerification = await userManager.verifyEmail(registerUser.DjangoUser.QuantumToken);
                  props.history.push("/home");
                  setIsLoading(false);
                }
              } catch (err) {
                console.log(err);
                await postNewErrorLog(err, "Register.js", "handleFormSubmit");
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

  if (isLoading) {
    return (
      <div className="loading_container">
        {/* <div className="loading_pop_up">Loading...</div> */}
        <div className="spinner icon-spinner-2" aria-hidden="true"></div>
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
