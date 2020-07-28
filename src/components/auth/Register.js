import React, { useState } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import "./Register.css";
import { confirmAlert } from "react-confirm-alert";
// import keys from "../../keys/Keys";
// import ImageUploader from "react-images-upload";
const remoteUrl = process.env.REACT_APP_BASE_URL;

const Register = (props) => {

  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    password: user.sub.split("|")[1],
    address: "",
    auth0_identifier: user.sub.replace("|", "."),
  });

  // const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

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
            onClick: async () => {
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
                // Django User is object I specified to come back from API iin register.py
                if ("DjangoUser" in registerUser) {
                  props.setDjangoToken(registerUser.DjangoUser);
                  props.setAuthToken(registerUser.DjangoUser.QuantumToken)
                  // Setting AuthUser from props passed from App to Application Views to Register. Setting the user high up in app to then filter back down.
                  props.setAuthUser(registerUser.DjangoUser);

                  const verifyEmail = async (key) => {
                    try {
                      const response = await fetch(`${remoteUrl}/rest-auth/registration/verify-email/`, {
                      // const response = await fetch(`${remoteUrl}/accounts-rest/registration/account-confirm-email/${key}/`, {
                      // const response = await fetch(`${remoteUrl}/registration/verify-email/${key}/`, {
                        method: 'POST',
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${key}`
                        },
                        body: key,
                      })
                      if (response.ok) {
                        const jsonResponse = await response.json();
                        console.log({ jsonResponse })
                      }
                      throw new Error('Verify Email Request Failed')
                    } catch (err) {
                      console.info(err);
                    }

                  };
                  // verifyEmail(registerUser.DjangoUser.QuantumToken);
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
    <form className="register-form" onSubmit={handleFormSubmit}>
      <fieldset className="fs-register-form">
        <h3 className="register-title">Complete Your Profile</h3>
        <div className="profile-create-form">
          <label htmlFor="first_name">First Name</label>
          <input
            className="input"
            onChange={handleAuthUserInputChange}
            type="text"
            id="first_name"
            placeholder="First Name"
            required
            autoFocus
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            className="input"
            onChange={handleAuthUserInputChange}
            type="text"
            id="last_name"
            placeholder="Last Name"
            required
            autoFocus
          />

          <label htmlFor="username">Username</label>
          <input
            className="input"
            onChange={handleAuthUserInputChange}
            type="text"
            id="username"
            placeholder="Enter Username"
            required
            autoFocus
          />

          <label htmlFor="address">Address</label>
          <input
            className="input"
            onChange={handleAuthUserInputChange}
            type="text"
            id="address"
            placeholder="Enter Address"
            required
            autoFocus
          />

          <button
            className="register-create-btn"
            type="submit"
            disabled={isLoading}
          >
            Finish
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default Register;
