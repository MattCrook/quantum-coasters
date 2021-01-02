import React from "react";
import "../Profile.css";

const DefaultView = (props) => {
  const { rollerCoaster } = props;
  const { park } = props;

  return (
    <>
      <div className="default_card_container">
        <div className="default_ride_item_ride_name">{rollerCoaster.name}</div>
        <div className="default_ride_item_park_name">{park.name}</div>
      </div>
    </>
  );
};

export default DefaultView;
