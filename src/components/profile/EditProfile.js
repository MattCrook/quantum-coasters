import React, { useState, useEffect } from "react";
import userManager from "../../modules/users/userManager";
import imageManager from "../../modules/images/imageManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { useAuthUser } from "../../contexts/AuthUserContext";
import { useErrorLog } from "../../contexts/ErrorLogContext";
import { useActivityLog } from "../../contexts/ActivityLogContext";
import { confirmAlert } from "react-confirm-alert";
import "./Profile.css";

const EditProfile = (props) => {
  const { user, logout, loading, djangoRestAuthLogout, clearStorage } = useAuth0();
  const { authUser, userProfile, userCredits, setAuthUser, setUserProfile } = useAuthUser();
  const { postNewErrorLog } = useErrorLog();
  const { postEditProfileActivityLog, postChangeProfilePictureActivityLog } = useActivityLog();
  const { userProfileId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const [image, setImage] = useState({ id: "", image: "" });
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUploadError, setImageUploadError] = useState(false);
  const [authUserToUpdate, setAuthUserToUpdate] = useState({
    id: "",
    first_name: "",
    last_name: "",
    username: "",
    email: "",
  });
  const [userProfileToUpdate, setUserProfileToUpdate] = useState({
    id: userProfileId,
    address: "",
    image: "",
    credits: "",
  });
  const defaultQPicture = "https://cdn.dribbble.com/users/2908839/screenshots/6292457/shot-cropped-1554473682961.png";
  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

  const toggleProfileDropdown = () => setIsProfileDropdown(!isProfileDropdown);

  const userAuthAndProfile = (authUser, userProfile) => {
    if (authUser.id && userProfile.id) {
      setUserProfileToUpdate(userProfile);
      setAuthUserToUpdate(authUser);
    }
  };

  const handleInputChangeUserProfile = (e) => {
    const state = { ...userProfileToUpdate };
    state[e.target.id] = e.target.value;
    setUserProfileToUpdate(state);
  };

  const handleInputChangeUser = (e) => {
    const state = { ...authUserToUpdate };
    state[e.target.id] = e.target.value;
    setAuthUserToUpdate(state);
  };

  const handleFileReader = (fileReaderResult) => {
    let imgTagToFill = document.getElementById("edit-profile-pic");
    imgTagToFill.src = fileReaderResult;
  };

  const allowedExtensions = ["txt", "pdf", "png", "jpg", "jpeg", "gif"];
  const handleImagePreview = (e) => {
    e.preventDefault();
    const clearInput = () => (document.getElementById("image").value = "");
    const file = e.target.files[0];

    const splitExtension = (filename) => {
      const ext = filename.split(".")[1];
      return ext;
    };

    const findMatchingExt = (array, extensionToFind) => array.includes(extensionToFind);

    if (file) {
      const fileExtension = splitExtension(file.name);
      const isValidExtension = findMatchingExt(allowedExtensions, fileExtension);

      if (!file.type.startsWith("image/")) {
        setImageUploadError(true);
        alert("Only image files are supported");
        // document.querySelector(".upload_image_error_message").style.display = "block";
        clearInput();
      } else if (file.size > 5000000) {
        setImageUploadError(true);
        alert("File size cannot exceed 5MB");
        // document.querySelector(".upload_image_error_message").style.display = "block";
        clearInput();
      } else if (!isValidExtension) {
        setImageUploadError(true)
        // document.querySelector(".upload_image_error_message").style.display = "block";
        clearInput();
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          handleFileReader(reader.result);
        };
        reader.readAsDataURL(file);
        setImage(file);
        setSelectedImage(file.name);
      }
    }
  };

  // Build form to send image (File) to API. Must be in this format to send a file.
  // Files cannot be JSON stringified or parsed.
  const gatherFormData = () => {
    const formdata = new FormData();
    const isNewImage = image.name ? image : null;
    isNewImage ? formdata.append("image", image) : formdata.append("image", null);
    return formdata;
  };

  // Handle posting new image, get form data from From above, send to API, and set the current user's image ID to the PK(ID) of new Image resource.
  // Then attach that fk (image_id) to the userProfile object when user updates profile.
  const handleImageFromSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = gatherFormData();
    const newImageResult = await imageManager.postNewImage(formData);
    setImage(newImageResult);

    const updatedUserProfile = {
      id: userProfileId,
      address: userProfileToUpdate.address,
      image: newImageResult,
      credits: userProfileToUpdate.credits,
    };

    await userManager.putEditedUserProfile(updatedUserProfile);
    await postChangeProfilePictureActivityLog(authUser.id);
    setUserProfile(updatedUserProfile);
    setIsLoading(false);
  };

  // const allowedExtensions = ["txt", "pdf", "png", "jpg", "jpeg", "gif"];
  // Function to provide client side validation for the Image input / file upload on the Invoice Settings form.
  // Grabs the file when user clicks a file to upload:
  // Checks type of file it is, the file extension (found in the array above, which corresponds to ALLOWED_EXTENSIONS in alchemy.py) and Checks file size.
  // If any validation fails, will run clearInput and clear the file from the input and display the Error message.
  // (findMatchingExt) iterates the array above and returns true if the returned value from (splitExtension) matches any item. Otherwise returns false.
  // const handleImageUpload = (event) => {
  //   const inputFile = event.target.files[0];
  //   const clearInput = () => (document.getElementById("image").value = "");

  //   const splitExtension = (filename) => {
  //     const ext = filename.split(".")[1];
  //     return ext;
  //   };

  //   const findMatchingExt = (array, extensionToFind) => array.includes(extensionToFind);

  //   if (inputFile) {
  //     const fileExtension = splitExtension(inputFile.name);
  //     const isValidExtension = findMatchingExt(allowedExtensions, fileExtension);

  //     if (!inputFile.type.startsWith("image/")) {
  //       document.querySelector(".upload_image_error_message").style.display = "block";
  //       clearInput();
  //     } else if (inputFile.size > 5000000) {
  //       document.querySelector(".upload_image_error_message").style.display = "block";
  //       clearInput();
  //     } else if (!isValidExtension) {
  //       document.querySelector(".upload_image_error_message").style.display = "block";
  //       clearInput();
  //     } else {
  //       inputFile[event.target.id] = event.target.value;
  //     }
  //   }
  // };

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
      postNewErrorLog(error, "EditProfile.js", "deleteUserProfile");
    }
  };

  // Building objects to send to Api.
  // If there is a new image, Post new image to images table, grab the ID, and send with new image_id,
  // if there is an image already there, keep that and grab the ID send with that image_id, else send with no image(empty string).
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const editedAuthUser = {
      id: authUserToUpdate.id,
      first_name: authUserToUpdate.first_name,
      last_name: authUserToUpdate.last_name,
      username: authUserToUpdate.username,
      email: authUserToUpdate.email,
    };

    if (!loading && userProfile && image.id) {
      const editedUserProfile = {
        id: userProfileId,
        address: userProfileToUpdate.address,
        image: userProfileToUpdate.image,
        credits: userProfileToUpdate.credits,
      };
      await userManager.putEditedAuthUser(editedAuthUser);
      await userManager.putEditedUserProfile(editedUserProfile);
      setAuthUser(editedAuthUser);
      setUserProfile(editedUserProfile);
    } else if (!loading && userProfile && !image) {
      const editedUserProfile = {
        id: userProfileId,
        address: userProfileToUpdate.address,
        image: null,
        credits: userProfileToUpdate.credits,
      };
      await userManager.putEditedAuthUser(editedAuthUser);
      await userManager.putEditedUserProfile(editedUserProfile);
      setAuthUser(editedAuthUser);
      setUserProfile(editedUserProfile);
    } else {
      // 'Else' for edge case if image === null, It takes the default image above which was set in state. But the user didn't pick.
      // So Thinks the user picked an image, but UserProfile.image === null, but image (in state) is the defaultProfilePic.
      // Leave image blank to not create a blank resource in DB.
      const editedUserProfile = {
        id: userProfileId,
        address: userProfileToUpdate.address,
        image: null,
        credits: userProfileToUpdate.credits,
      };
      await userManager.putEditedAuthUser(editedAuthUser);
      await userManager.putEditedUserProfile(editedUserProfile);
      setAuthUser(editedAuthUser);
      setUserProfile(editedUserProfile);
    }
    setIsLoading(false);
    window.alert("Profile has been updated!");
    await postEditProfileActivityLog(authUser.id, props, "/user/profile/credits");
  };

  useEffect(() => {
    const getAndSetUserImage = async () => {
      try {
        const isUserProfileImage = userProfile.image ? userProfile.image : null;
        if (isUserProfileImage !== null) {
          const imageId = userProfile.image.id;
          const getImage = await imageManager.getAuthUserImage(imageId);
          setImage(getImage);
        } else {
          setImage(defaultQPicture);
        }
      } catch (err) {
        console.log({ err });
        await postNewErrorLog(err, "EditProfile.js", "getAndSetUserImage");
      }
    };
    userAuthAndProfile(authUser, userProfile);
    getAndSetUserImage();
    setIsLoading(false);
  }, [userProfile, authUser, postNewErrorLog]);

  const isLoadingUploadPhoto = () => {
    return (
      <div id="ui_segment" className="ui segment">
        <p>Uploading Photo...</p>
        <div id="ui_dimmer" className="ui active inverted dimmer">
          <div id="ui_loader" className="ui large loader"></div>
        </div>
      </div>
    );
  };

  const profilePicture = () => {
    return !loading && userProfile && image && image.image ? (
      <img id="edit-profile-pic" src={image.image} alt="My Avatar" />
    ) : (
      <img id="edit-profile-pic" src={defaultQPicture} alt="My Avatar" />
    );
  };

  const navBarEnd = () => {
    return (
      <div className="navbar-end">
        {authUser.email ? (
          <div id="navbar-item-home-name" className="navbar-item-home-name">
            {authUser.first_name} {authUser.last_name}
          </div>
        ) : (
          <div className="navbar_item_home_user_name">{user.email}</div>
        )}
        <button onClick={() => toggleProfileDropdown()}>
          {!loading && userProfile.image ? (
            <img data-testid="home-profile-pic-testid" id="profile-pic" src={userProfile.image.image} alt="My Avatar" />
          ) : (
            <img data-testid="home-profile-pic-testid" id="profile-pic" src={defaultProfilePicture} alt="My Avatar" />
          )}
        </button>
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
    );
  };

  return (
    <>
      <nav className="navbar-edit-profile">
        <div className="edit-profile-title-container">
          <h4 className="edit-profile-title">Edit Your Profile</h4>
        </div>
        <div>{navBarEnd()}</div>
      </nav>

      {isProfileDropdown ? (
        <div className="nav_profile_dropdown_container">
          <>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => props.history.push("/home")}>
                Home
              </div>
              {/* <i className="fas fa-long-arrow-alt-right"></i> */}
              <i className="fas fa-home"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item" onClick={() => props.history.push("/user/profile/credits")}>
                Profile/ Credits
              </div>
              <i className="far fa-user"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item">Give Feedback</div>
              <i className="far fa-comments"></i>
            </div>
            <div className="nav_profile_dropdown_row">
              <div className="nav_profile_dropdown_item">Report a Bug</div>
              <i className="fas fa-bug"></i>
            </div>
          </>
        </div>
      ) : null}
      <div className="profile-pic-container">
        <div className="profile-pic-flex-box">
          {isLoading ? (
            <div className="upload_photo_filler">{isLoadingUploadPhoto()}</div>
          ) : (
            <div className="upload_photo_filler">{profilePicture()}</div>
          )}
          <form className="uploadPicture" onSubmit={handleImageFromSubmit} encType="multipart/form-data">
            <div className="file has-name is-right is-small">
              <label className="file-label">
                <input
                  id="image"
                  className="file-input"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImagePreview}
                  required
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">Upload Photo</span>
                </span>
                {selectedImage ? (
                  <span id="no_file_chosen_space" className="file-name">
                    {selectedImage}
                  </span>
                ) : (
                  <span id="no_file_chosen_space" className="file-name">
                    No File Chosen
                  </span>
                )}
              </label>
            </div>
            <button type="submit" className="change_photo_btn" disabled={isLoading}>
              Change Photo
            </button>
          </form>
          {imageUploadError ? (
            <div class="image_upload_error">Error uploading image. Please try another Image.</div>
          ) : null}
          <div></div>
        </div>

        <div className="profile-info-container">
          <div className="user_info_title">
            {" "}
            <i className="fas fa-user-circle"></i> Personal Information
          </div>
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
              value={authUserToUpdate.first_name}
              required
            />
          </div>

          <div className="edit_profile_input_container">
            <label htmlFor="last_name">Last Name</label>
            <input
              className="input"
              onChange={handleInputChangeUser}
              type="text"
              id="last_name"
              value={authUserToUpdate.last_name}
              required
            />
          </div>

          <div className="edit_profile_input_container">
            <label htmlFor="username">Username</label>
            <input
              className="input"
              onChange={handleInputChangeUser}
              type="text"
              id="username"
              value={authUserToUpdate.username}
              required
            />
          </div>

          <div className="edit_profile_input_container">
            <label htmlFor="address">Address</label>
            <input
              className="input"
              onChange={handleInputChangeUserProfile}
              type="address"
              id="address"
              value={userProfileToUpdate.address}
              required
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
      <div className="danger_zone_container">
        <div className="danger_zone_title">Danger Zone</div>
        <div className="delete_account_btn_container">
          <div className="delete_account_description">Delete Your Quantum Coasters Account</div>
          <div className="delete-profile-button-container">
            <button
              className="delete-profile-button"
              data-testid="delete_profile_btn_testid"
              onClick={() => deleteUserProfile(authUser.id)}
            >
              <i className="fas fa-exclamation-triangle"></i>Delete Profile
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
