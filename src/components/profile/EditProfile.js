import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import { confirmAlert } from "react-confirm-alert";
import keys from "../../keys/Keys";
import "./Profile.css";

const EditProfile = props => {

  const { user, loading, logout } = useAuth0();

  const [userCredits, setUserCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [userProfile, setUserProfile] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: user.email,
    address: "",
    credits: [],
    picUrl: ""
  });
  const getProfile = async user => {
    let profileFetch = await ApiManager.getUserProfile(user.email);
    setUserProfile(profileFetch[0]);
  };

  const handleInputChange = e => {
    const stateToChange = { ...userProfile };
    stateToChange[e.target.id] = e.target.value;
    setUserProfile(stateToChange);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    ApiManager.putEditedProfile(userProfile)
      .then(updatedProfile => {
        setIsLoading(false);
        setUserProfile(updatedProfile);
        window.alert("Profile has been updated!");
        props.history.push("/users");
      })
      .catch(e => console.log(e));
  };

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "photoLab");
    setIsLoading(true);
    const res = await fetch(
     // http://localhost:8200/cloudinary://418576712586226:IaXis96Iz93J6NH7PTrU1clKpGM@capstone-project
      `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`,
      {
        method: "POST",
        body: data
      }
    );
    const file = await res.json();
    setImage({ picUrl: file.secure_url });
    setIsLoading(false);
  };

  const getUserCredits = async user => {
    try {
      const userProfileFromAPI = await ApiManager.getUserProfile(user.email);
      setUserProfile(userProfileFromAPI[0]);
      const rollerCoasterIds = userProfileFromAPI[0].credits.map(credit => {
        const creditId = credit.rollerCoasterId;
        return creditId;
      });

      let promises = [];
      rollerCoasterIds.forEach(creditId => {
        promises.push(ApiManager.getRollerCoastersWithAllExpanded(creditId));
      });
      Promise.all(promises).then(data => {
        setUserCredits(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserProfile = id => {
    try {
      confirmAlert({
        title: "Confirm to delete",
        message: "Are you sure you want to delete your profile? Once this is done you will no longer have an account and will loose your credits.",
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
    getProfile(user);
    getUserCredits(user);
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
            className="delete-profile-button" data-testid="delete_profile_btn_testid"
            onClick={() => deleteUserProfile(userProfile.id)}
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
            <input
              name="file"
              id="picUrl"
              type="file"
              className="file-upload"
              placeholder="Upload an Image"
              data-cloudinary-field="image_id"
              onChange={uploadImage}
              data-form-data="{ 'transformation': {'crop':'limit','tags':'samples','width':3000,'height':2000}}"
            />
            {/* <div className="newPhoto">
              {loading ? (
                <h3> Loading...</h3>
              ) : (
                <>
                  <img
                    src={image.picUrl}
                    style={{ width: "300px" }}
                    alt="upload-photos"
                  />
                </>
              )}
            </div> */}
          </div>
        </div>
        <div className="profile-info-container">
          <div>First: {userProfile.first_name}</div>
          <div>Last: {userProfile.last_name}</div>
          <div>Username: {userProfile.username}</div>
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
            onChange={handleInputChange}
            type="text"
            id="first_name"
            required=""
            autoFocus=""
            value={userProfile.first_name}
          />
          <label htmlFor="last_name">Last Name</label>

          <input
            className="input"
            onChange={handleInputChange}
            type="text"
            id="last_name"
            required=""
            autoFocus=""
            value={userProfile.last_name}
          />
          <label htmlFor="inputUsername">Username</label>
          <input
            className="input"
            onChange={handleInputChange}
            type="text"
            id="username"
            required=""
            autoFocus=""
            value={userProfile.username}
          />
          <label htmlFor="inputAddress">Address</label>
          <input
            className="input"
            onChange={handleInputChange}
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
