import React, { useState, useEffect } from "react";
import userManager from "../../modules/users/userManager";
import imageManager from "../../modules/images/imageManager";
import creditManager from "../../modules/credits/creditManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
import "./Profile.css";

const EditProfile = (props) => {
  const { user, logout, loading } = useAuth0();
  const { userProfileId } = props;

  const [userCredits, setUserCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({ id: "", image: "" });
  const [authUser, setAuthUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    password: "",
  });

  const [userProfile, setUserProfile] = useState({
    id: userProfileId,
    address: "",
    image: "",
    credits: "",
  });

  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";
  const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";

  // Function to first get the auth user from the email passed from auth0 context, then get the userProfile from the id of the auth user by the user_id FK on userProfile.
  // Once have those, fetch image by image id on the userProfile.
  // Then finally fetch all credits and filter them down to specific credits for the current logged in user.
  const getProfileAndCredits = async (user) => {
    try {
      const authUserFromAPI = await userManager.getAuthUser(user.email);
      // Fetches all credits...ToDo: filter on backend to retrieve only the user's credits.
      const creditsToFetch = await creditManager.getCreditIdFromApi();
      const authProfile = authUserFromAPI[0];
      setAuthUser(authProfile);

      const userProfileFromAPI = await userManager.getUserProfileEmbeddedAuthUser(authProfile.id);
      const profile = userProfileFromAPI[0];
      setUserProfile(profile);

      if (profile.image) {
        const imageId = profile.image.id;
        const getImage = await imageManager.getAuthUserImage(imageId);
        setImage(getImage);
      } else {
        setImage(defaultProfilePicture);
      }
      const filterUsersCredits = creditsToFetch.filter((credit) => credit.userProfile === profile.id);
      setUserCredits(filterUsersCredits);
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
    const stateToChange = { ...authUser };
    stateToChange[e.target.id] = e.target.value;
    setAuthUser(stateToChange);
  };


  const handleFileReader = (result) => {
    let imgTagToFill = document.getElementById("edit-profile-pic");
    imgTagToFill.src = result;
  };


  const handleImagePreview = (e) => {
    const clearInput = () => (document.getElementById("image").value = "");
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Only image files are supported");
        clearInput();
      } else if (file.size > 5000000) {
        alert("File size cannot exceed 5MB");
        clearInput();
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          handleFileReader(reader.result);
        };
        reader.readAsDataURL(file);
        setImage(file);
      }
    };
  };

  console.log({image})

  // Building objects to send to Api.
  // If there is a new image, Post new image to images table, grab the ID, and send with new image_id,
  // if there is an image already there, keep that and grab the ID send with that image_id, else send with no image(empty string).
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const editedAuthUser = {
      id: authUser.id,
      first_name: authUser.first_name,
      last_name: authUser.last_name,
      username: authUser.username,
      email: user.email,
      password: authUser.password,
    };

    if (!loading && userProfile && image.id) {
      const editedUserProfile = {
        id: userProfileId,
        address: userProfile.address,
        image: image,
        credits: userProfile.credits,
      };
      await userManager.putEditedAuthUser(editedAuthUser);
      await userManager.putEditedUserProfile(editedUserProfile);
      props.setAuthUser(editedAuthUser);
      props.setUserProfile(editedUserProfile);
    } else if (!loading && userProfile && !image) {
      const editedUserProfile = {
        id: userProfileId,
        address: userProfile.address,
        image: null,
        credits: userProfile.credits,
      };
      await userManager.putEditedAuthUser(editedAuthUser);
      await userManager.putEditedUserProfile(editedUserProfile);
      props.setAuthUser(editedAuthUser);
      props.setUserProfile(editedUserProfile);
    } else {
      // 'Else' for edge case if image === null, It takes the default image above which was set in state. But the user didn't pick.
      // So Thinks the user picked an image, but UserProfile.image === null, but image (in state) is the defaultProfilePic.
      // Leave image blank to not create a blank resource in DB.

      const editedUserProfile = {
        id: userProfileId,
        address: userProfile.address,
        image: null,
        credits: userProfile.credits,
      };
      await userManager.putEditedAuthUser(editedAuthUser);
      await userManager.putEditedUserProfile(editedUserProfile);
      props.setAuthUser(editedAuthUser);
      props.setUserProfile(editedUserProfile);
    }
    setIsLoading(false);
    window.alert("Profile has been updated!");
    props.history.push("/user/profile/credits");
  };

  // Build form to send image (File) to API. Must be in this format to send a file.
  // Files cannot be JSON stringified or parsed.
  const gatherFormData = () => {
    const formdata = new FormData();
    if (image.image === "") {
      formdata.append("image", null);
    } else {
      formdata.append("image", image.image);
    }
    return formdata;
  };

  // Handle posting new image, get form data from From above, send to API, and set the current user's image ID to the PK(ID) of new Image resource.
  // Then attach that fk (image_id) to the userProfile object when user updates profile.
  const handleImageFromSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = gatherFormData();
    const postNewImage = await imageManager.postNewImage(formData);
    setImage(postNewImage);
    const image_id = postNewImage.id;

    const newUserProfileObject = {
      id: userProfileId,
      address: userProfile.address,
      image_id: image_id,
      credits: userProfile.credits,
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
            onClick: () => userManager.deleteUserProfile(id).then(() => logout()),
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
            onClick={() => deleteUserProfile(authUser.id)}
          >
            <i className="fas fa-exclamation-triangle"></i>Delete Profile
          </button>
        </div>
      </nav>

      <div className="profile-pic-container">
        <div className="profile-pic-flex-box">
          {!loading && userProfile && image.image ? (
            <img id="edit-profile-pic" src={image.image} alt="Click Change Photo to confirm upload of new Image." />
          ) : (
            <img id="edit-profile-pic" src={defaultQPicture} alt="My default pic" />
          )}

          <form className="uploadPicture" onSubmit={handleImageFromSubmit} encType="multipart/form-data">
            <div className="change-profile-pic">
              <label className="label_upload_profile_pic" htmlFor="image">
                Profile picture
              </label>
              <input
                name="image"
                id="image"
                type="file"
                accept="image/*"
                className="file-upload"
                onChange={handleImagePreview}
                required
              />
            </div>
            <button type="submit" className="change_photo_btn" disabled={isLoading}>
              Change Photo
            </button>
          </form>
        </div>
        <div className="profile-info-container">
          <div className="user_info_title"> <i className="fas fa-user-circle"></i> Personal Information</div>
          <div className="user_info_container">
          <div className="user_info">
            <div className="user_info_row_title">First Name: </div>
            <div className="user_info_item">{authUser.first_name}</div>
          </div>
          <div className="user_info">
            <div className="user_info_row_title">Last Name: </div>
            <div className="user_info_item">{authUser.last_name}</div>
          </div>
          <div className="user_info">
            <div className="user_info_row_title">Username: </div>
            <div className="user_info_item">{authUser.username}</div>
          </div>
          <div className="user_info">
            <div className="user_info_row_title">Address: </div>
            <div className="user_info_item">{userProfile.address}</div>
          </div>
          {!loading && userCredits ? (
            <div className="user_info_credits">
              <div className="user_info_row_title">Total Credits: </div>
              <div className="user_info_item">{userCredits.length}</div>
            </div>
          ) : (
            <div className="user_info">
              <div>Total Credits: </div>0
            </div>
          )}
          </div>
        </div>
      </div>

      <form className="edit-profile-form" onSubmit={handleFormSubmit}>
        <div className="profile-inputs">
          <div className="edit_profile_input_container">
            <label className="first_name" htmlFor="first_name">
              First Name
            </label>
            <input
              className="input"
              onChange={handleInputChangeUser}
              type="text"
              id="first_name"
              required
              value={authUser.first_name}
            />
          </div>

          <div className="edit_profile_input_container">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="input"
              onChange={handleInputChangeUser}
              type="text"
              id="last_name"
              required
              value={authUser.last_name}
            />
          </div>

          <div className="edit_profile_input_container">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              onChange={handleInputChangeUser}
              type="text"
              id="username"
              required
              value={authUser.username}
            />
          </div>

          <div className="edit_profile_input_container">
            <label htmlFor="address">Address</label>
            <input
              className="input"
              onChange={handleInputChangeUserProfile}
              type="text"
              id="address"
              required
              value={userProfile.address}
            />
          </div>
          <button className="edit-create-btn" type="submit" disabled={isLoading}>
            Confirm Changes
          </button>
        </div>
      </form>
      <div className="signature">
        <p className="signature_edit_profile">
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};

export default EditProfile;
