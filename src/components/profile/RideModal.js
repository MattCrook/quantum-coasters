import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";
import "./RideModal.css";

const RideModal = (props) => {

  const rideName = props.ride[0].name;
  const maxSpeed = props.ride[0].max_speed;
  const maxHeight = props.ride[0].max_height;
  const manufacturer = props.ride[0].manufacturer;
  const trackType = props.ride[0].tracktype.name;
  const park = props.ride[0].park.name;

  return (
    <div className="ride_modal micromodal-slide" id="ride-modal" aria-hidden="true">
      <div className="ride_modal__overlay" tabIndex="1" data-micromodal-close>
        <div className="ride_modal__container" role="dialog" aria-modal="true" aria-labelledby="ride-modal-1-title">
          <header className="ride_modal__header">
            <h2 className="ride_modal__title" id="ride-modal-1-title">
              {rideName}
            </h2>
            <span className="trash_icon_profile_card">
              <button
                data-testid="delete-credit-btn"
                className="delete-btn"
                onClick={() => props.deleteCredit(props.ride.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </span>
            <button className="ride_modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>

          <main className="ride_modal__content" id="ride-modal-content">
            <div id="ride_modal">
              <div className="modal-ride-details-section">
                <strong className="details_title">Details</strong>
                <h4>Home Park: {park}</h4>
                <div className="linkForCompanyWebsite">
                  <h4>Manufactured By: {manufacturer.name}</h4>
                  <a className="link-to-company" href={manufacturer.company_website}>
                    <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                  </a>
                </div>

                <p>Max Speed: {maxSpeed} mph</p>
                <p>Max Height: {maxHeight} ft</p>
                <p>Track Type: {trackType}</p>
              </div>

              <footer className="ride_modal__footer">
                <button
                  id="ride_modal_close_btn"
                  className="ride_modal__btn"
                  data-micromodal-close
                  aria-label="Close this dialog window"
                >
                  Close
                </button>
              </footer>
            </div>

            <div className="signature">
              <p>
                Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                <i className="fas fa-trademark"></i>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RideModal;
