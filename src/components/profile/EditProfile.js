import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./Profile.css";

const EditProfile = props => {
  const { user, loading } = useAuth0();

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
        setUserProfile(updatedProfile);
      })
      .catch(e => console.log(e));
  };

  const uploadImage = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "photoLab");
    setIsLoading(true);
    // const res = await fetch(
    //   `https://api.cloudinary.com/v1_1/${keys.cloudinary}/image/upload`,
    //   {
    //     method: "POST",
    //     body: data
    //   }
    // );
    // const file = await res.json();
    // setImage({ picUrl: file.secure_url });
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



  console.log({ user });
  console.log({ userProfile });
  console.log({ props });



  useEffect(() => {
    getProfile(user);
    getUserCredits(user);
  }, []);

  return (
    <>
      {/* <form className="edit-profile-form" onSubmit={handleFormSubmit}>
        <fieldset className="fs-edit-form"> */}
          <div className="title">
            <h3 className="edit-profile-title">Edit Your Profile</h3>
          </div>

          <div className="profile-pic-container">
          {userProfile.picUrl ? (
              <img id="profile-pic" src={userProfile.picUrl} alt="My Avatar" />
            ) : (
              <img id="profile-pic" src={user.picture} alt="My Avatar" />
            )}
            </div>
            <div>
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
            <div className="newPhoto">
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
            </div>
          </div>





            <div>{userProfile.first_name}</div>
            <div>{userProfile.last_name}</div>
            <div>{userProfile.username}</div>
            <div className="list-of-credits">List of Credits</div>
            {userCredits.map(credit => (
                <li key={credit.id}>{credit.name}</li>
            ))}

           
           
           
           
           
           
           
           
           
           {/* <div>
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
            <div className="newPhoto">
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
            </div>
          </div> */}

          <div className="profile-inputs">
            <label htmlFor="first_name">First Name</label>
            <input
              className="input"
              onChange={handleInputChange}
              type="text"
              id="first_name"
              required=""
              autoFocus=""
            />
            <label htmlFor="last_name">Last Name</label>

            <input
              className="input"
              onChange={handleInputChange}
              type="text"
              id="last_name"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputUsername">Username</label>
            <input
              className="input"
              onChange={handleInputChange}
              type="text"
              id="username"
              required=""
              autoFocus=""
            />
            <label htmlFor="inputAddress">Address</label>
            <input
              className="input"
              onChange={handleInputChange}
              type="text"
              id="address"
              required=""
              autoFocus=""
            />
          </div>
          <button className="edit-create-btn" type="submit">
            Complete
          </button>
        {/* </fieldset>
      </form> */}
    </>
  );
};

export default EditProfile;
