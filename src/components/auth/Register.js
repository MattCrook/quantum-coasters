import React, { useState } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import userManager from "../../modules/users/userManager";
import "./Register.css";
import { confirmAlert } from "react-confirm-alert";
// import keys from "../../keys/Keys";
// import ImageUploader from "react-images-upload";

const Register = (props) => {
  const { user } = useAuth0();
  // const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [isLoading, setIsLoading] = useState(false);
  // const [hasUser, setHasUser] = useState(isAuthenticated());
  const [authUser, setAuthUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    password: user.sub,
    address: "",
    image: ""
  });
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";



  // const setUserToken = (resp) => {
  //   sessionStorage.setItem("Quantumtoken", resp.token);
  //   setHasUser(isAuthenticated());
  // };

  const handleAuthUserInputChange = (e) => {
      const stateToChange = { ...authUser };
      stateToChange[e.target.id] = e.target.value;
      setAuthUser(stateToChange);
  };

  const handleFormSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();

    if (
      authUser.first_name === "" ||
      authUser.last_name === "" ||
      authUser.username === "" ||
      authUser.address === ""
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
              const newUser = {
                first_name: authUser.first_name,
                last_name: authUser.last_name,
                username: authUser.username,
                email: user.email,
                password: user.sub,
                address: authUser.address,
                image: defaultProfilePicture
              };
              userManager.register(newUser).then(resp => {
                console.log(resp);
                // if ("QuantumToken" in resp) {
                //   setUserToken(resp);
                // };
              })
              .catch(error => {
                console.log(error)
              })
              props.history.push("/home");
            },
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
          <label htmlFor="inputUsername">Username</label>
          <input
            className="input"
            onChange={handleAuthUserInputChange}
            type="text"
            id="username"
            placeholder="Enter Username"
            required
            autoFocus
          />
          <label htmlFor="inputAddress">Address</label>
          <input
            className="input"
            onChange={handleAuthUserInputChange}
            type="text"
            id="address"
            placeholder="Enter Address"
            required
            autoFocus
          />
          {/* <label htmlFor="eventImage">Please upload a profile picture</label> */}
          {/* <ImageUploader
            {...props}
            withIcon={true}
            withPreview={true}
            onChange={onDrop}
            imgExtension={[".jpg", ".gif", ".png", ".gif"]}
            maxFileSize={5242880}
            className="file-upload"
            id="picUrl"
            accept="image/*"
          /> */}
          {/* <input
            name="file"
            id="image"
            type="file"
            accept="image/*"
            className="file-upload"
            placeholder="Upload an Image"
            onChange={handleAuthUserInputChange}
            // ref={imageUploader}
            data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            required
          />
          <div className="newPhoto">
            {isLoading ? (
              <h3> Loading...</h3>
            ) : (
              <>
                  <img src={{ ...authUser.image.url }} style={{ width: "300px" }} alt="" />
              </>
            )}
          </div> */}
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
