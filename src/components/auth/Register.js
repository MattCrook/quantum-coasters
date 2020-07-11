import React, { useState, useEffect } from "react";
import { useAuth0 } from "../../contexts/react-auth0-context";
import ApiManager from "../../modules/ApiManager";
import keys from "../../keys/Keys";
import "./Register.css";
import { confirmAlert } from "react-confirm-alert";
// import ImageUploader from "react-images-upload";

const Register = (props) => {
  const { user } = useAuth0();
  const isAuthenticated = () => sessionStorage.getItem("token") !== null;
  const [isLoading, setIsLoading] = useState(false);
  const [hasUser, setHasUser] = useState(isAuthenticated());
  // const [image, setImage] = useState({});
  const [authUser, setAuthUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    password: user.sub,
    address: "",
    credits: [],
    image: ""
  });



  // const authUserFromProps = props.authUser;
  // const userProfileFromProps = props.userProfile;
  // const setAuthUserFromProp = props.setAuthUser;
  // const setUserProfileFromProps = props.setUserProfile;
  // const authUserId = authUserFromProps.id;
  // const userProfileId = userProfileFromProps.id;
  // const imageId = userProfile.image_id;


  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

  // const setUserToken = (resp) => {
  //   sessionStorage.setItem("Quantumtoken", resp.token);
  //   setHasUser(isAuthenticated());
  // };

  const uploadImage = (e) => {
    const inputFile = e.target.files[0];
    // A hackey way of kicking the file out of the input when validations fail
    const clearInput = () => (document.getElementById("image").value = "");

    // First check if the user actually ended up uploading a file
    if (inputFile) {
      // Then, check if it's an image
      if (!inputFile.type.startsWith("image/")) {
        alert("Only image files are supported");
        clearInput();
        // Then check if it's smaller than 5MB
      } else if (inputFile.size > 5000000) {
        alert("File size cannot exceed 5MB");
        clearInput();
      } else {
        // The image is only set in state && if the above validations pass
        const stateToChange = { ...authUser };
        stateToChange[e.target.id] = inputFile
        setAuthUser(stateToChange);
      }
    }
  };
  // If the field is not the image, watch the form inputs, otherwise send to the image handler
  const handleAuthUserInputChange = (e) => {
    if (e.target.id !== "image") {
      const stateToChange = { ...authUser };
      stateToChange[e.target.id] = e.target.value;
      setAuthUser(stateToChange);
    } else {
      uploadImage(e);
    }
  };

  // Because an image is not a string type, json/stringify and content-type cannot be used in a fetch call
  // so instead, we create the fetch body.
  const gatherImageRequestBody = () => {
    const formdata = new FormData();
    formdata.append("first_name", authUser.first_name);
    formdata.append("last_name", authUser.last_name);
    formdata.append("username", authUser.username);
    formdata.append("password", authUser.password);
    formdata.append("address", authUser.address);
    formdata.append("credits", authUser.credits);
    if (authUser.image === "") {
      formdata.append("image", defaultProfilePicture);
    } else {
      formdata.append("image", authUser.image.name);
    }
    console.log("FDATA", formdata)
    return formdata
  }

  const handleFormSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    sessionStorage.setItem(
      "userPicture from register",
      JSON.stringify(user.picture)
    );
    const formdata = gatherImageRequestBody()
    // console.log(formdata)
    // const accessToken = localStorage.getItem('accessToken');
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
              // const newUser = {
              //   first_name: authUser.first_name,
              //   last_name: authUser.last_name,
              //   username: authUser.username,
              //   email: user.email,
              //   password: user.sub,
              //   address: authUser.address,
              //   credits: [],
              //   image: authUser.image
              // };
              const registerNewUser = await ApiManager.register(formdata);
              console.log("R1", registerNewUser)
              // setAuthUser(formdata, true);
              // if ("Quantumtoken" in registerNewUser) {
              //   setUserToken(response);
              // };
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


  // const onDrop = picture => {
  //   console.log({...image})
  //   console.log(picture)
  //   setImage({...image}, picture);
  // };

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

export default Register;





                // ApiManager.postNewImage(formdata).then(response => {
                //   console.log("R2", response)
              // props.history.push("/home", {userProfile: userProfile});
              // can use above method to transfer the state using location object - by props.location.state.userProfile

              // } else if (!user.picture && !image.image) {
              //   const newUserProfile = {
              //     address: userProfile.address,
              //     credits: [],
              //     picUrl:
              //       "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png",
              //   };
              //   const newUser = {
              //     first_name: userProfile.first_name,
              //     last_name: userProfile.last_name,
              //     username: userProfile.username,
              //     email: user.email,
              //   };
              //   ApiManager.postNewUserProfile(
              //     userProfileId,
              //     newUserProfile
              //   ).then((newProfile) => {
              //     props.setUserProfile(newProfile, true);
              //     ApiManager.postNewAuthUser(newUser).then((newAuthUser) => {
              //       props.setAuthUser(newAuthUser, true);
              //     });
              //     props.history.push("/home");
              //   });
              // } else if (image.picUrl) {
              //   const newUserProfile = {
              //     address: userProfile.address,
              //     credits: [],
              //     picUrl: image.picUrl,
              //   };
              //   const newUser = {
              //     first_name: userProfile.first_name,
              //     last_name: userProfile.last_name,
              //     username: userProfile.username,
              //     email: user.email,
              //   };
              //   ApiManager.postNewUserProfile(userProfileId, newUserProfile).then((newProfile) => {
              //     props.setUserProfile(newProfile, true);
              //     ApiManager.postNewAuthUser(newUser).then((newAuthUser) => {
              //       props.setAuthUser(newAuthUser, true);
              //     });
              //     props.history.push("/home");
              //   });
              // }
