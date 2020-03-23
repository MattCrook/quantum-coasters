import React from "react";
import "./Profile.css";

const ProfileCard = props => {
  console.log("props", {props});

  const picUrl = props.user.picture
  const username = props.username;
  const userNickname = props.user.nickname

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="ride-name-container">
          <h3 className="ride-name">{props.rollerCoaster.name}</h3>
        </div>
        <br />
        <div className="ride-details-section">
          <strong>Details</strong>
        </div>
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
        <p>Track Type: {props.trackType.name}</p>
        {/* <span data-tooltip="EDIT">
          <i
            className="big edit icon"
            id="newsDetailIcon"
            onClick={() => props.history.push(`/profile/${props.rollerCoaster.id}/edit`)}
          ></i>
        </span>

        <span data-tooltip="DELETE">
          <i
            id="trashIcon"
            className="big trash alternate icon"
            onClick={() => props.deleteCredit(props.rollerCoaster.id)}
          ></i>
        </span> */}

        <section className="edit-delete-credit">
          <span>
            <button
              className="edit-btn"
              onClick={() =>
                props.history.push(`/users/${props.rollerCoaster.id}/edit`)
              }
            >
              Edit
            </button>
          </span>
          <span>
            <button
              className="delete-btn"
              onClick={() => props.deleteCredit(props.rollerCoaster.id)}
            >
              Delete
            </button>
          </span>
        </section>
      </div>
    </div>
  );
};
export default ProfileCard;
