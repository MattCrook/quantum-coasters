import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
// import keys from "../../keys/Keys";
import ImageUploader from "react-images-upload";
import "./Profile.css";

const EditProfile = (props) => {
  const { user, logout } = useAuth0();
  const { userProfileId } = props;

  const [userCredits, setUserCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({ id: "", image: "" });
  const [apiUser, setApiUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
  });

  const [userProfile, setUserProfile] = useState({
    id: userProfileId,
    address: "",
    image_id: "",
    credits: "",
  });

  const defaultProfilePicture =
    "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

  const getProfileAndCredits = async (user) => {
    try {
      const authUserFromAPI = await ApiManager.getAuthUser(user.email);
      const creditsToFetch = await ApiManager.getCreditIdFromApi();
      const authProfile = authUserFromAPI[0];
      setApiUser(authProfile);

      const userProfileFromAPI = await ApiManager.getUserProfileEmbeddedAuthUser(
        authProfile.id
      );
      const profile = userProfileFromAPI[0];
      setUserProfile(profile);
      console.log(profile);

      const imageId = profile.image_id;
      console.log("imageId", imageId);
      if (imageId) {
        const getImage = await ApiManager.getAuthUserImage(imageId);
        setImage(getImage[0]);
      } else {
        setImage(defaultProfilePicture);
      }
      const filterUsersCredits = creditsToFetch.filter(
        (credit) => credit.userProfile === profile.id
      );
      setUserCredits(filterUsersCredits[0]);

      const picture = user.picture;
      const picUrl = profile.image;
      console.log("picURL", picUrl);

      // if (picUrl === null) {
      //   const userProfileObject = {
      //     id: profile.id,
      //     address: profile.address,
      //     image: defaultProfilePicture,
      //     credits: profile.credits[0],
      //   };

      //   const apiUserObject = {
      //     id: authProfile.id,
      //     first_name: authProfile.first_name,
      //     last_name: authProfile.last_name,
      //     username: authProfile.username,
      //     email: user.email,

      //   };
      //   setUserProfile(userProfileObject);
      //   setApiUser(apiUserObject)

      // } else if (!picUrl && picture) {
      //   const userProfileObj = {
      //     id: profile.id,
      //     address: profile.address,
      //     image: picture,
      //     rollerCoaster_id: profile.credits[0],
      //   };
      //   const apiUserObject = {
      //     id: authProfile.id,
      //     first_name: authProfile.first_name,
      //     last_name: authProfile.last_name,
      //     username: authProfile.username,
      //     email: user.email,

      //   }
      //   setUserProfile(userProfileObj);
      //   setApiUser(apiUserObject)

      // } else if (picUrl) {
      //   const userProfObj = {
      //     id: profile.id,
      //     address: profile.address,
      //     image: picUrl,
      //     rollerCoaster_id: profile.credits[0],
      //   };
      //   const apiUserObject = {
      //     id: authProfile.id,
      //     first_name: authProfile.first_name,
      //     last_name: authProfile.last_name,
      //     username: authProfile.username,
      //     email: user.email,

      //   };
      //   setUserProfile(userProfObj);
      //   setApiUser(apiUserObject);

      // };
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChangeUserProfile = (e) => {
    const stateToChange = { ...userProfile };
    stateToChange[e.target.id] = e.target.value;
    setUserProfile(stateToChange);
  };

  const handleInputChangeUser = (e) => {
    const stateToChange = { ...apiUser };
    stateToChange[e.target.id] = e.target.value;
    setApiUser(stateToChange);
  };

  const handleImageUpload = (event) => {
    const inputFile = event.target.files[0];

    // A hackey way of kicking the file out of the input
    // when validations fail
    const clearInput = () => (document.getElementById("image_path").value = "");

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
        // The image is only set in state
        // if the above validations pass
        const stateToChange = { ...image };
        stateToChange[event.target.id] = inputFile;
        setImage(stateToChange);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updateAuthUser = await ApiManager.putEditedAPIUser(apiUser);
    const updateUserProfile = await ApiManager.putEditedUserProfile(
      userProfile
    );
    setIsLoading(false);
    window.alert("Profile has been updated!");
    props.history.push("/users");
  };

  const gatherFormData = () => {
    const formdata = new FormData();
    if (image.image === "") {
      formdata.append("image", null);
    } else {
      formdata.append("image", image.image);
    }
    return formdata;
  };

  const handleImageFromSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = gatherFormData();
    const postNewImage = await ApiManager.postNewImage(formData);
    setImage(postNewImage[0]);
    const image_id = postNewImage.id;

    const newUserProfileObject = {
      id: userProfileId,
      address: "",
      image_id: image_id,
      credits: "",
    };
    setUserProfile(newUserProfileObject);
    setIsLoading(false);
  };

  const deleteUserProfile = (id) => {
    try {
      confirmAlert({
        title: "Confirm to delete",
        message:
          "Are you sure you want to delete your profile? Once this is done you will no longer have an account and will loose your credits.",
        buttons: [
          {
            label: "Yes",
            onClick: () =>
              ApiManager.deleteUserProfile(id).then(() => logout()),
          },
          {
            label: "No",
            onClick: () => "",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileAndCredits(user);
    setIsLoading(false);
  }, [user]);

  return (
    <>
      <nav className="navbar-edit-profile">
        <div className="edit-profile-title-container">
          <h4 className="edit-profile-title">Edit Your Profile</h4>
        </div>
        <div className="delete-profile-button-container">
          <button
            className="delete-profile-button"
            data-testid="delete_profile_btn_testid"
            onClick={() => deleteUserProfile(apiUser.id)}
          >Delete Profile</button>
        </div>
      </nav>

      <div className="profile-pic-container">
        <div className="profile-pic-flex-box">
          {!userProfile.image_id ? (
            <img
              id="edit-profile-pic"
              src={defaultProfilePicture}
              alt="My default pic"
            />
          ) : (
            <img
              id="edit-profile-pic"
              src={userProfile.image}
              alt="My Avatar"
            />
          )}

          <form className="uploadPicture" onSubmit={handleImageFromSubmit} encType="multipart/form-data">
            <div className="change-profile-pic">
              <label htmlFor="image">Profile picture</label>
              <input
                name="image"
                id="image"
                type="file"
                accept="image/*"
                className="file-upload"
                onChange={handleImageUpload}
              />
            </div>
            <button
              type="submit"
              className="change_photo_btn"
              disabled={isLoading}
            >
              Change Photo
            </button>
          </form>

        </div>
        <div className="profile-info-container">
          <div>First: {apiUser.first_name}</div>
          <div>Last: {apiUser.last_name}</div>
          <div>Username: {apiUser.username}</div>
          <div>Address: {userProfile.address}</div>
        </div>
      </div>

      <form className="edit-profile-form" onSubmit={handleFormSubmit}>
        <div className="profile-inputs">
          <label htmlFor="first_name">First Name</label>
          <input
            className="input"
            onChange={handleInputChangeUser}
            type="text"
            id="first_name"
            required
            // autoFocus
            value={apiUser.first_name}
          />
          <label htmlFor="last_name">Last Name</label>

          <input
            className="input"
            onChange={handleInputChangeUser}
            type="text"
            id="last_name"
            required
            // autoFocus
            value={apiUser.last_name}
          />
          <label htmlFor="username">Username</label>
          <input
            className="input"
            onChange={handleInputChangeUser}
            type="text"
            id="username"
            required
            // autoFocus
            value={apiUser.username}
          />
          <label htmlFor="address">Address</label>
          <input
            className="input"
            onChange={handleInputChangeUserProfile}
            type="text"
            id="address"
            required
            // autoFocus
            value={userProfile.address}
          />
          <button
            className="edit-create-btn"
            type="submit"
            disabled={isLoading}
          >
            Confirm Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
