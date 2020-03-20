import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ApiManager from "../../modules/ApiManager";
import "./Profile.css";

const ProfileCard = props => {
  // console.log("props", props);

  const [manufacturer, setManufacturer] = useState({});
  const [rollerCoasters, setRollerCoasters] = useState([]);

  // useEffect(() => {
  //   ApiManager.getManufacturerWithRollerCoaster()
  //   .then(dataFromAPI => {
  //     console.log("result", dataFromAPI);
  //     setManufacturer(dataFromAPI)
  //     setRollerCoasters(dataFromAPI.rollerCoasters)
  //   });
  // }, []);

  const picUrl = props.currentUserProfile.picture;
  const username = props.currentUserProfile.nickname;
  const user = props.currentUserProfile.user;
  //   const credits =

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <h3 className="ride-name">{props.rollerCoaster.name}</h3>
        <div className="ride-details-section">Details</div>
        <h4>Home Park: {props.park.name}</h4>
        <h4>Manufactured By: {props.manufacturer.name}</h4>
        <Link to={manufacturer.manufacturer_url}>
          <button>See More</button>
        </Link>
        <p>
          <strong>Max Speed</strong>
          {props.rollerCoaster.max_speed} MPH
        </p>
        <p>
          <strong>Max Height</strong>
          {props.rollerCoaster.max_height} ft
        </p>
        <p>Track Type {props.trackType.name}</p>
        <div data-tooltip="DELETE">
          <i
            id="trashIcon"
            className="big trash alternate icon"
            onClick={() => props.deleteCredit(props.userCredit.id)}
          ></i>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
