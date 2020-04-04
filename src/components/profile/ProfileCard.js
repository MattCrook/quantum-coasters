import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

const ProfileCard = props => {

  const rollerCoaster = props.rollerCoaster;
  const manufacturer = props.manufacturer;
  const park = props.park;

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="ride-name-container">
          <h3 className="ride-name">{rollerCoaster.name}</h3>
        </div>
        <br />
        <div className="ride-details-section">
          <strong>Details</strong>
        </div>
        <h4>Home Park: {park.name}</h4>
        <h4>Manufactured By: {manufacturer.name}</h4>
        <div className="linkForCompanyWebsite">
          <a className="link-to-company" href={manufacturer.manufacture_url}>
            See More
          </a>
        </div>

        <p>Max Speed: {rollerCoaster.max_speed} mph</p>
        <p>Max Height: {rollerCoaster.max_height} ft</p>
        <p>Track Type: {props.trackType.name}</p>
        <section className="card-btns">
          <span>
            <button
              className="edit-btn"
              onClick={() =>
                props.history.push(`/users/${rollerCoaster.id}/edit`)
              }
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </span>

          <span>
            <button
              data-testid="delete-credit-btn"
              className="delete-btn"
              onClick={() => props.deleteCredit(rollerCoaster.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </span>
        </section>
      </div>
    </div>
  );
};
export default ProfileCard;
