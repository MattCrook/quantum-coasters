import React from "react";
import "../styles/BulkRCForm.css";

const BulkSubmitPreview = (props) => {
  const ridesToAdd = (props) => {
    return props.fullRideData.map((ride, i) => (
      <div key={i} className="preview_ride_card_wrapper">
        <div className="preview_col_1">
          <div className="preview_ride_name">{ride.name}</div>
        </div>
        <div className="preview_col_2">
          <div className="preview_details_item">Max Height: {ride.max_height} feet</div>
          <div className="preview_details_item">Max Speed: {ride.max_speed}mph</div>
          <div className="preview_details_item">Track Type: {ride.trackType.name}</div>
          <div className="preview_details_item">Manufacturer: {ride.manufacturer.name}</div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="preview_master_container">
        <div className="preview_form_wrapper">
          <div className="preview_header_container">
            <div className="preview_title">Bulk Roller Coaster Submission to {props.park.name}</div>
          </div>
          <div className="preview_title_row">
            <div className="preview_ride_name_title">Ride Name</div>
            <div className="preview_details_title">Details</div>
          </div>
          <div className="preview_data_row">
            <div className="preview_items_container">{ridesToAdd(props)}</div>
          </div>
          <form onSubmit={props.submitForm}>
            <input className="submit_bulk_add_form" type="submit" disabled={props.IsLoading} />
          </form>
          <div className="signature">
            <p id="signature_font_form">
              Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default BulkSubmitPreview;
