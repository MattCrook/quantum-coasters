import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
// import keys from "../../keys/Keys";
import ImageUploader from "react-images-upload";
import "./Profile.css";

const EditProfile = props => {
  const { user, logout } = useAuth0();

  const [userCredits, setUserCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [apiUser, setApiUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
  })
  const [userProfile, setUserProfile] = useState({
    email: user.email,
    address: "",
    picUrl: "",
    rollerCoaster_id: [],
  });


  const getProfileAndCredits = async (user) => {
    try {
      const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
      const creditsToFetch = await ApiManager.getCreditIdFromApi();
      const profile = userProfileFromAPI[0];
      const expandedUserProfile = userProfileFromAPI[0].userprofile;
      const filterUsersCredits = creditsToFetch.filter(
        (credit) => credit.userProfile === profile.userprofile.id
      );
      setApiUser(profile);
      setUserProfile(expandedUserProfile);
      const creditsMap = filterUsersCredits.map((credit) => {
        const rollerCoasterId = credit.rollerCoaster;
        return rollerCoasterId;
      });
      let promises = [];
      creditsMap.forEach((item) => {
        promises.push(ApiManager.getRollerCoastersForUserProfile(item))
      });
      Promise.all(promises).then((data) => {
        setUserCredits(data);
      })
        .catch((error) => {
        console.log(error)
      })
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
    const stateToChange = { ...apiUser }
    stateToChange[e.target.id] = e.target.value;
    setApiUser(stateToChange)
  }

  const handleFormSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    ApiManager.putEditedProfile(userProfile)
      .then(updatedUserProfile => {
        setUserProfile(updatedUserProfile);
      })
      .catch(e => console.log(e));
      ApiManager.putEditedAPIUser(apiUser)
      .then(updatedApiUser => {
        setApiUser(updatedApiUser);
        setIsLoading(false);
        window.alert("Profile has been updated!");
        props.history.push("/users");
    })
  };

  const onDrop = picture => {
    setImage({ ...image }, picture);
  };


  const deleteUserProfile = id => {
    try {
      confirmAlert({
        title: "Confirm to delete",
        message:
          "Are you sure you want to delete your profile? Once this is done you will no longer have an account and will loose your credits.",
        buttons: [
          {
            label: "Yes",
            onClick: () => ApiManager.deleteUserProfile(id).then(() => logout())
          },
          {
            label: "No",
            onClick: () => ""
          }
        ]
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
          {userProfile.picUrl ? (
            <img
              id="edit-profile-pic"
              src={userProfile.picUrl}
              alt="My Avatar"
            />
          ) : (
            <img id="edit-profile-pic" src={user.picture} alt="My Avatar" />
          )}
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
              // accept="image/*"
            />
          </div>
        </div>

        <div className="profile-info-container">
          <div>First: {apiUser.first_name}</div>
          <div>Last: {apiUser.last_name}</div>
          <div>Username: {apiUser.username}</div>
          <div>Address: {userProfile.address}</div>
          <div className="list-of-credits">List of Credits</div>
          {userCredits.map(credit => (
            <li key={credit.id}>{credit.name}</li>
          ))}
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
            required=""
            autoFocus=""
            value={apiUser.first_name}
          />
          <label htmlFor="last_name">Last Name</label>

          <input
            className="input"
            onChange={handleInputChangeUser}
            type="text"
            id="last_name"
            required=""
            autoFocus=""
            value={apiUser.last_name}
          />
          <label htmlFor="inputUsername">Username</label>
          <input
            className="input"
            onChange={handleInputChangeUser}
            type="text"
            id="username"
            required=""
            autoFocus=""
            value={apiUser.username}
          />
          <label htmlFor="inputAddress">Address</label>
          <input
            className="input"
            onChange={handleInputChangeUserProfile}
            type="text"
            id="address"
            required=""
            autoFocus=""
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
