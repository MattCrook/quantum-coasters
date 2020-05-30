import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";

const ProfileCard = (props) => {

  const { rollerCoaster } = props;
  const { manufacturer } = props;
  const { park } = props;
  const { trackType } = props;

  return (
    <div className="profile-card">
      <div className="profile-card-content">
        <div className="ride-name-container">
          <h3 className="ride-name">{rollerCoaster.name}</h3>
        </div>
        <div className="ride-details-section">
          <strong>Details</strong>
          <h4>Home Park: {park.name}</h4>
          <div className="linkForCompanyWebsite">
            <h4>Manufactured By: {manufacturer.name}</h4>
            <a className="link-to-company" href={manufacturer.manufacture_url}>
              <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            </a>
          </div>

          <p>Max Speed: {rollerCoaster.max_speed} mph</p>
          <p>Max Height: {rollerCoaster.max_height} ft</p>
          <p>Track Type: {trackType.name}</p>
        </div>
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
