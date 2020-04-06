import React, { useState, useRef } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import ApiManager from "../../modules/ApiManager";
import keys from "../../keys/Keys";
import "./Register.css";
import { confirmAlert } from "react-confirm-alert";

const CreateAccount = props => {
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});

  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);

  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    address: "",
    credits: [],
    picUrl: user.picture
  });

  // ToDO: add another object with default picture if there is no picture uploaded OR google image

  const handleInputChange = e => {
    const stateToChange = { ...userProfile };
    stateToChange[e.target.id] = e.target.value;
    setUserProfile(stateToChange);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    sessionStorage.setItem("userPicture", JSON.stringify(user.picture));
    if (
      userProfile.first_name === "" ||
      userProfile.last_name === "" ||
      userProfile.username === "" ||
      userProfile.address === ""
    ) {
      window.alert("Please fill out all form fields.");
    } else {
      confirmAlert({
        title: "Profile Complete! You can edit the information anytime.",
        message:
          "Thanks for completing your profile. You can start recording your coaster credits!",
        buttons: [
          {
            label: "Ok",
            onClick: async () => {
              if ((user.picture) && (image.picUrl === "")) {
                const newUserProfile = {
                  first_name: userProfile.first_name,
                  last_name: userProfile.last_name,
                  username: userProfile.username,
                  email: user.email,
                  address: userProfile.address,
                  credits: [],
                  picUrl: user.picture
                };
                ApiManager.postNewUserProfile(newUserProfile).then(
                  newProfile => {
                    props.setUserProfile(newProfile, true);
                    props.history.push("/home");
                    // props.history.push("/home", {userProfile: userProfile});
                    // can use above method to transfer the state using location object - by props.location.state.userProfile
                  }
                );
              } else if ((user.picture === "") && (image.picUrl === "")) {
                const newUserProfile = {
                  first_name: userProfile.first_name,
                  last_name: userProfile.last_name,
                  username: userProfile.username,
                  email: user.email,
                  address: userProfile.address,
                  credits: [],
                  picUrl:
                    "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png"
                };
                ApiManager.postNewUserProfile(newUserProfile).then(
                  newProfile => {
                    props.setUserProfile(newProfile, true);
                    props.history.push("/home");
                  }
                );
              } else if (image.picUrl !== "") {
                const newUserProfile = {
                  first_name: userProfile.first_name,
                  last_name: userProfile.last_name,
                  username: userProfile.username,
                  email: user.email,
                  address: userProfile.address,
                  credits: [],
                  picUrl: image.picUrl
                };
                ApiManager.postNewUserProfile(newUserProfile).then(
                  newProfile => {
                    props.setUserProfile(newProfile, true);
                    props.history.push("/home");
                    // props.history.push("/home", {userProfile: userProfile});
                    // can use above method to transfer the state using location object - by props.location.state.userProfile
                  }
                );
              }
            }
          }
        ],
        closeOnClickOutside: true,
        onClickOutside: () => {},
        onKeypressEscape: () => {}
      });
      setIsLoading(false);
    }
  };

  const uploadImage = e => {
    const [file] = e.target.files;
    if (file) {
      setIsLoading(true);
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
       reader.readAsText(file);
      setImage({picUrl: file.name});
      console.log("result", file);




      // console.log("src", current)
      // console.log("src2", uploadedImage)
      // console.log("src3", uploadedImage.current)
      // console.log("src4", uploadedImage.current.src)
    }
    setIsLoading(false);
  };
  console.log({image})


  return (
    <form className="register-form" onSubmit={handleFormSubmit}>
      <fieldset className="fs-register-form">
        <h3 className="register-title">Complete Your Profile</h3>
        <div className="profile-create-form">
          <label htmlFor="first_name">First Name</label>
          <input
            className="input"
            onChange={handleInputChange}
            type="text"
            id="first_name"
            placeholder="First Name"
            required=""
            autoFocus=""
          />
          <label htmlFor="last_name">Last Name</label>

          <input
            className="input"
            onChange={handleInputChange}
            type="text"
            id="last_name"
            placeholder="Last Name"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputUsername">Username</label>
          <input
            className="input"
            onChange={handleInputChange}
            type="text"
            id="username"
            placeholder="Enter Username"
            required=""
            autoFocus=""
          />
          <label htmlFor="inputAddress">Address</label>
          <input
            className="input"
            onChange={handleInputChange}
            type="text"
            id="address"
            placeholder="Enter Address"
            required=""
            autoFocus=""
          />
          <label htmlFor="eventImage">Please upload a profile picture</label>
          <input
            name="file"
            id="picUrl"
            type="file"
            accept="image/*"
            className="file-upload"
            placeholder="Upload an Image"
            // data-cloudinary-field="image_id"
            onChange={uploadImage}
            ref={imageUploader}
            data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
          />
          <div className="newPhoto">
            {isLoading ? (
              <h3> Loading...</h3>
            ) : (
              <>
                <img src={image.picUrl} ref={uploadedImage} style={{ width: "300px" }} alt="" />
              </>
            )}
          </div>
          <button className="register-create-btn" type="submit">
            Finish
          </button>
        </div>
      </fieldset>
    </form>
  );
};

export default CreateAccount;
