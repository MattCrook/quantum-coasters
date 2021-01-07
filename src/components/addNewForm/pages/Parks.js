import React from "react";
import "../styles/BulkRCForm.css"

const Parks = (props) => {
  return (
      <>

          <div className="parks_items_container">
      <div className="parks_parkname" onClick={() => props.history.push(`/parks/${props.park.id}/bulkupload`)}>{props.park.name}</div>
              <div className="parks_park_location">{props.park.parkLocation}, {props.park.parkCountry}</div>
          </div>
    </>
  );
};

export default Parks;
