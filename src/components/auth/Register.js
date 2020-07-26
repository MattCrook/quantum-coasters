import React, { useState } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import "./Register.css";
import { confirmAlert } from "react-confirm-alert";
// import keys from "../../keys/Keys";
// import ImageUploader from "react-images-upload";

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
    auth0_identifier: user.sub.replace("|", ".")
  });

  // const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";



  const handleAuthUserInputChange = (e) => {
      const stateToChange = { ...formData };
      stateToChange[e.target.id] = e.target.value;
      setFormData(stateToChange);
  };


  const handleFormSubmit = (e) => {
    setIsLoading(true)
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
                auth0_identifier: user.sub.replace("|", ".")
              };

              userManager.register(newUserObject).then(resp => {
                if ("DjangoUser" in resp) {
                  props.setDjangoToken(resp.DjangoUser);
                  props.history.push("/home");
                };
              })
                .catch(error => {
                  console.log(error)
                })
              }
          },
          {
            label: "Cancel",
            onClick: () => {},
          }
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
