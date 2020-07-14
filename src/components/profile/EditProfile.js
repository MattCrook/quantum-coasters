import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
// import keys from "../../keys/Keys";
import ImageUploader from "react-images-upload";
import "./Profile.css";

const EditProfile = (props) => {
  const { user, logout } = useAuth0();

  const [userCredits, setUserCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [apiUser, setApiUser] = useState([]);
  const [userProfile, setUserProfile] = useState([]);

  const defaultProfilePicture = "https://aesusdesign.com/wp-content/uploads/2019/06/mans-blank-profile-768x768.png";

  const getProfileAndCredits = async (user) => {
    try {
      const authUserFromAPI = await ApiManager.getAuthUser(user.email);
      const creditsToFetch = await ApiManager.getCreditIdFromApi();
      const authProfile = authUserFromAPI[0];
      const userProfileFromAPI = await ApiManager.getUserProfileEmbeddedAuthUser(authProfile.id)
      const profile = userProfileFromAPI[0];
      console.log({ authProfile })
      console.log({profile})
      const filterUsersCredits = creditsToFetch.filter((credit) => credit.userProfile === profile.id);
      setUserCredits(filterUsersCredits[0])
      console.log({filterUsersCredits})
      const picture = user.picture;
      const picUrl = profile.image;


      if (picUrl === null) {
        const userProfileObject = {
          id: profile.id,
          address: profile.address,
          image: defaultProfilePicture,
          credits: profile.credits[0],
        };

        const apiUserObject = {
          id: authProfile.id,
          first_name: authProfile.first_name,
          last_name: authProfile.last_name,
          username: authProfile.username,
          email: user.email,

        };
        setUserProfile(userProfileObject);
        setApiUser(apiUserObject)

      } else if (!picUrl && picture) {
        const userProfileObj = {
          id: profile.id,
          address: profile.address,
          image: picture,
          rollerCoaster_id: profile.credits[0],
        };
        const apiUserObject = {
          id: authProfile.id,
          first_name: authProfile.first_name,
          last_name: authProfile.last_name,
          username: authProfile.username,
          email: user.email,

        }
        setUserProfile(userProfileObj);
        setApiUser(apiUserObject)

      } else if (picUrl) {
        const userProfObj = {
          id: profile.id,
          address: profile.address,
          image: picUrl,
          rollerCoaster_id: profile.credits[0],
        };
        const apiUserObject = {
          id: authProfile.id,
          first_name: authProfile.first_name,
          last_name: authProfile.last_name,
          username: authProfile.username,
          email: user.email,

        };
        setUserProfile(userProfObj);
        setApiUser(apiUserObject);

      };
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    ApiManager.putEditedUserProfile(userProfile)
      .then((updatedUserProfile) => {
        setUserProfile(updatedUserProfile);
      })
      .catch((e) => console.log(e));

    ApiManager.putEditedAPIUser(apiUser).then((updatedApiUser) => {
      console.log(updatedApiUser)
      setApiUser(updatedApiUser);
    });

      setIsLoading(false);
      window.alert("Profile has been updated!");
      props.history.push("/users");
  };

  const onDrop = (picture) => {
    setImage({ ...image }, picture);
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
          >
            Delete Profile
          </button>
        </div>
      </nav>
      <div className="profile-pic-container">
        <div className="profile-pic-flex-box">
          {userProfile.image === null && !user.picture ? (
            <img
              id="edit-profile-pic"
              src={defaultProfilePicture}
              alt="My Avatar"
            />
          ) : (
            <img
              id="edit-profile-pic"
              src={userProfile.picUrl}
              alt="My Avatar"
            />
        )}
          {/* {!userProfile.picUrl ? (
            <img id="edit-profile-pic" src={user.picture} alt="My Avatar" />
          )} */}
          <div className="change-profile-pic">
            <label htmlFor="picUrl">Profile picture</label>

            <ImageUploader
              {...props}
              withIcon={true}
              withPreview={true}
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif"]}
              maxFileSize={5242880}
              className="file-upload"
              id="picUrl"
            />
          </div>
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
          <label htmlFor="inputUsername">Username</label>
          <input
            className="input"
            onChange={handleInputChangeUser}
            type="text"
            id="username"
            required
            // autoFocus
            value={apiUser.username}
          />
          <label htmlFor="inputAddress">Address</label>
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
            Complete
          </button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
