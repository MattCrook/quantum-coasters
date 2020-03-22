import React from "react";
import "./Profile.css";

const ProfileCard = props => {
  // console.log("props", props);

  const picUrl = props.currentUserProfile.picture;
  const username = props.currentUserProfile.nickname;
  const user = props.currentUserProfile.user;

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="ride-name-container">
          <h3 className="ride-name">{props.rollerCoaster.name}</h3>
        </div>
        <div className="ride-details-section"><strong>Details</strong></div>
        <h4>Home Park: {props.park.name}</h4>
        <h4>Manufactured By: {props.manufacturer.name}</h4>
        <div className="linkForCompanyWebsite">
          <a
            className="link-to-company"
            href={props.manufacturer.manufacture_url}
          >
            See More
          </a>
        </div>

        <p>
          Max Speed: 
          {props.rollerCoaster.max_speed} mph
        </p>
        <p>
          Max Height: 
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
