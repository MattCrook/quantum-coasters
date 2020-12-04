import React, { useState, useCallback } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import "./Register.css";
import { confirmAlert } from "react-confirm-alert";
import { useActivityLog } from "../../contexts/ActivityLogContext";

// import ImageUploader from "react-images-upload";

const Register = (props) => {
  // const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  const { user } = useAuth0();
  const { postActivityLogRegistration } = useActivityLog();
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
  });

  const attempts = useCallback(() => {
    setLoginAttempts(loginAttempts + 1)
  }, [loginAttempts])

  const handleAuthUserInputChange = (e) => {
    const stateToChange = { ...formData };
    stateToChange[e.target.id] = e.target.value;
    setFormData(stateToChange);
  };

  const handleFormSubmit = (e) => {
    setIsLoading(true);
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
            onClick: async (e) => {
              const newUserObject = {
                first_name: formData.first_name.trim(),
                last_name: formData.last_name.trim(),
                username: formData.username.trim(),
                email: formData.email.trim(),
                password: user.sub.split("|")[1],
                address: formData.address.trim(),
                auth0_identifier: user.sub.replace("|", "."),
              };
              try {
                const registerUser = await userManager.register(newUserObject);
                // Django User is object I specified to come back from API in register.py
                if ("DjangoUser" in registerUser) {
                  props.setDjangoToken(registerUser.DjangoUser);
                  props.setAuthToken(registerUser.DjangoUser.QuantumToken);
                  // Setting AuthUser from props passed from App to Application Views to Register. Setting the user high up in app to then filter back down.
                  props.setAuthUser(registerUser.DjangoUser);
                  sessionStorage.setItem("sessionId", registerUser.DjangoUser.session);
                  const loginData = {
                    user_id: registerUser.DjangoUser.id,
                    email: registerUser.DjangoUser.email,
                    browser: props.browserData,
                    recent_attempts: loginAttempts,
                    version: props.userAgentData,
                    platform: props.platformOS,
                    app_code_name: props.appCodeNameData,
                  };
                  await props.sendLoginInfo(loginData);
                  postActivityLogRegistration(e, registerUser.DjangoUser.id)

                  // Function to POST to rest-auth verify email endpoint with the key returned from register.
                  // const sendEmailVerification = await userManager.verifyEmail(registerUser.DjangoUser.QuantumToken);
                  props.history.push("/home");
                }
              } catch (err) {
                console.log(err);
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
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="register-form" onSubmit={handleFormSubmit}>
        <fieldset className="fs-register-form">
          <h3 className="register-title">Complete Your Profile</h3>
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
              Finish
            </button>
          </div>
        </fieldset>
      </form>
      <div className="signature">
        <p>
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};

export default Register;
