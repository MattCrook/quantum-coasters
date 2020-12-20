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
          <div className="ride-name">
            {rollerCoaster.name}
            <span className="trash_icon_profile_card">
              <button
                data-testid="delete-credit-btn"
                className="delete-btn"
                onClick={() => props.deleteCredit(rollerCoaster.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </span>
          </div>
        </div>
        <div className="ride-details-section">
          <div className="details">Details</div>
          <div className="profile_card_row">
            <div className="profile_card_row_item_title">Home Park:</div>
            <div className="profile_card_row_item">{park.name}</div>
          </div>
          <div className="profile_card_row">
              <div className="profile_card_row_item_title">Manufactured By:</div>
              <div className="profile_card_row_item">{manufacturer.name}
            <div className="linkForCompanyWebsite">
              <a className="link-to-company" href={manufacturer.company_website}>
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
              </a>
              </div>
              </div>
          </div>
          <div className="profile_card_row">
            <div className="profile_card_row_item_title">Max Speed:</div>
            <div className="profile_card_row_item">{rollerCoaster.max_speed} mph</div>
          </div>
          <div className="profile_card_row">
            <div className="profile_card_row_item_title">Max Height:</div>
            <div className="profile_card_row_item">{rollerCoaster.max_height} ft</div>
          </div>
          <div className="profile_card_row">
            <div className="profile_card_row_item_title">Track Type:</div>
            <div className="profile_card_row_item">{trackType.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileCard;
