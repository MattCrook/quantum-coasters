import React, { useState } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import ApiManager from "../../modules/ApiManager";
import keys from "../../keys/Keys";
import "./Register.css";
import { confirmAlert } from "react-confirm-alert";
// import ImageUploader from "react-images-upload";

const CreateAccount = (props) => {
  const { user } = useAuth0();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});

  // const uploadedImage = React.useRef(null);
  // const imageUploader = React.useRef(null);

  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    address: "",
    picUrl: user.picture,
    credits: [],
  });

  const handleInputChange = (e) => {
    const stateToChange = { ...userProfile };
    stateToChange[e.target.id] = e.target.value;
    setUserProfile(stateToChange);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    sessionStorage.setItem(
      "userPicture from createaccount",
      JSON.stringify(user.picture)
    );
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
              if (user.picture && !image.picUrl) {
                const newUserProfile = {
                  address: userProfile.address,
                  credits: [],
                  picUrl: user.picture,
                };
                const newUser = {
                  first_name: userProfile.first_name,
                  last_name: userProfile.last_name,
                  username: userProfile.username,
                  email: user.email,
                }
                ApiManager.postNewUserProfile(newUserProfile).then(
                  (newProfile) => {
                    props.setUserProfile(newProfile, true);
                    props.history.push("/home");
                    // props.history.push("/home", {userProfile: userProfile});
                    // can use above method to transfer the state using location object - by props.location.state.userProfile
                  }
                );
              } else if (!user.picture && !image.picUrl) {
                const newUserProfile = {
                  first_name: userProfile.first_name,
                  last_name: userProfile.last_name,
                  username: userProfile.username,
                  email: user.email,
                  address: userProfile.address,
                  picUrl:
                    "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png",
                  credits: [],
                };
                ApiManager.postNewUserProfile(newUserProfile).then(
                  (newProfile) => {
                    props.setUserProfile(newProfile, true);
                    props.history.push("/home");
                  }
                );
              } else if (image.picUrl) {
                const newUserProfile = {
                  first_name: userProfile.first_name,
                  last_name: userProfile.last_name,
                  username: userProfile.username,
                  email: user.email,
                  address: userProfile.address,
                  picUrl: image.picUrl,
                  credits: [],
                };
                ApiManager.postNewUserProfile(newUserProfile).then(
                  (newProfile) => {
                    console.log(newProfile)
                    props.setUserProfile(newProfile, true);
                    props.history.push("/home");
                    // props.history.push("/home", {userProfile: userProfile});
                    // can use above method to transfer the state using location object - by props.location.state.userProfile
                  }
                );
              }
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

  // const onDrop = picture => {
  //   console.log({...image})
  //   console.log(picture)
  //   setImage({...image}, picture);
  // };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    // data.append(`upload_preset, ${keys.upload_preset}`);
    console.log(files)
    const file = files[0];
    setImage({picUrl: file.name})
    setIsLoading(true);
    // const res = await fetch(
    //   // `https://api.cloudinary.com/v1_1/${keys.cloud_name}/image/upload`,
    //   `http://localhost:3000/userprofiles`,
    //   {
    //     method: "POST",
    //     body: data,
    //     cache: false,
    //     headers: {
    //       Accept: "application/json",
    //       Authorization: "Bearer " + localStorage.getItem("accessToken"),
    //     },
    //   }
    // );
    // const file = await res.json();
    // setImage({ picUrl: file.secure_url });
    setIsLoading(false);
  };

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
          <input
            name="file"
            id="picUrl"
            type="file"
            // accept="image/*"
            className="file-upload"
            placeholder="Upload an Image"
            data-cloudinary-field="image_id"
            onChange={uploadImage}
            // ref={imageUploader}
            data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
          />
          <div className="newPhoto">
            {isLoading ? (
              <h3> Loading...</h3>
            ) : (
              <>
                <img src={image.picUrl} style={{ width: "300px" }} alt="" />
              </>
            )}
          </div>
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

export default CreateAccount;
