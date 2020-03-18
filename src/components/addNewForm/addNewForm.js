import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

const AddNewRollerCoaster = () => {
  const { loading, user, history } = useAuth0();

  // set initial state of form to empty
  const [rollerCoaster, setRollerCoaster] = useState({
    name: "",
    trackType: "",
    max_height: "",
    max_speed: "",
    park: "",
    manufacturer: "",
    userId: ""
  });

  // handle what user is typing in
  const handleFieldChange = e => {
    const stateToChange = { ...rollerCoaster };
    stateToChange[e.target.id] = e.target.value;
    setRollerCoaster(stateToChange);
  };


  // object to go into database
  const constructNewRollerCoaster = e => {
    e.preventDefault();
    e.stopPropagation();

    const newRollerCoaster = {
      name: rollerCoaster.name,
      trackType: rollerCoaster.trackType,
      max_height: rollerCoaster.max_height,
      max_speed: rollerCoaster.max_speed,
      park: rollerCoaster.park,
      manufacturer: rollerCoaster.manufacturer,
      userId: user.id
    };

    // guard to make sure all fields are filled out
    if (
      rollerCoaster.name === "" ||
      rollerCoaster.trackType === "" ||
      rollerCoaster.max_height === "" ||
      rollerCoaster.max_speed === "" ||
      rollerCoaster.manufacturer === "" ||
      rollerCoaster.park === ""
    ) {
        alert("Please fill out all fields in form");
    } else {
      !loading &&
        ApiManager.postNewRollerCoaster(newRollerCoaster)
        .then(() => history.push("/profile"));
    }
  };

  return (
    <form className="main-form" onSubmit={constructNewRollerCoaster}>
    <fieldset className="fs-form">
        <h3 className="title">Input Ride Details</h3>
        <div className="create-form">
        <label htmlFor="inputName">Roller Coaster Name</label>
        <input
            className="input"
            onChange={handleInputFieldChange}
            type="name"
            id="name"
            placeholder="Enter Roller Coaster Name"
            required=""
            autoFocus=""
        />
        <label htmlFor="inputTrackType">Track Type</label>
        <input
            className="input"
            onChange={handleInputFieldChange}
            type="text"
            id="trackType"
            placeholder="Enter username"
            required=""
            autoFocus=""
        />

        <label htmlFor="inputPassword">Max Height</label>
        <input
            className="input"
            onChange={handleInputFieldChange}
            type="password"
            id="password"
            placeholder="Create Your Password"
            required=""
            autoFocus=""
        />
        <label htmlFor="confirm-password">Max Speed</label>
        <input
            className="input"
            onChange={handleInputFieldChange}
            type="password"
            id="confirmedPassword"
            placeholder="Re-enter Password"
            required=""
            autoFocus=""
        />
        <label htmlFor="eventImage">Please upload a profile picture</label>
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
        </div>
        <div className="create-buttons">
        <div>
            <label className="check-box-name">Remember Me</label>
            <input
            className="check-box"
            type="checkbox"
            onChange={handleSignInCheckBox}
            ></input>
        </div>
        <div className="newPhoto">
            {isLoading ?(
                <h3> Loading...</h3>
            ): (
                <>
                <img src={image.picUrl} style={{width: '300px'}} alt="upload-photos"/>
                </>
            )}
            </div>
        <button className="create-btn" type="submit">
            Join
        </button>
    
        </div>
    </fieldset>
    </form>
);
  );
};
