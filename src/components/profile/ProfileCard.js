import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
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
          <div className="ride-name">{rollerCoaster.name}
            <span className="trash_icon_profile_card">
              <button
                data-testid="delete-credit-btn"
                className="delete-btn"
                onClick={() => props.deleteCredit(rollerCoaster.id)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </span>
          </div>
        </div>
        <div className="ride-details-section">
          <strong>Details</strong>
          <h4>Home Park: {park.name}</h4>
          <div className="linkForCompanyWebsite">
            <h4>Manufactured By: {manufacturer.name}</h4>
            <a className="link-to-company" href={manufacturer.company_website}>
              <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            </a>
          </div>

          <p>Max Speed: {rollerCoaster.max_speed} mph</p>
          <p>Max Height: {rollerCoaster.max_height} ft</p>
          <p>Track Type: {trackType.name}</p>
        </div>

      </div>
    </div>
  );
};
export default ProfileCard;
