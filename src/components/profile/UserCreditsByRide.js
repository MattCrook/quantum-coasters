import React, { useState, useEffect } from "react";
import MicroModal from "micromodal";
import RideModal from "./RideModal";
import "./Profile.css";



const UserCreditsByRide = (props) => {
  const [rideNames, setRideNames] = useState([]);
  const [currentRide, setCurrentRide] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (currentRideId) => {
    const ride = rideNames.filter((ride) => ride.id === currentRideId);
    setCurrentRide(ride);
    setIsOpen(true);
  };

  const listItems = rideNames.map((ride) => (
    <button
      key={ride.id}
      id={ride.id}
      className="credits_by_ride_ride_name"
      onClick={() => handleOpenModal(ride.id)}
      data-micromodal-trigger="ride-modal"
    >
      {ride.name}
      <i className="fas fa-info-circle"></i>
    </button>
  ));

  useEffect(() => {
    let rides = [];
    if (props) {
      props.userRollerCoasters.forEach((ride) => {
        rides.push(ride);
      });
      setRideNames(rides);
    }
  }, [props, isOpen, currentRide]);

    console.log("current", currentRide);
    console.log("open", isOpen)

  return (
    <div id="credits_by_ride_main_container">
      {listItems}
      {isOpen && currentRide
        ? (MicroModal.init("ride-modal"),
          (<RideModal key={currentRide.id} ride={currentRide} deleteCredit={props.deleteCredit} {...props} />))
        : null}
    </div>
  );
};

export default UserCreditsByRide;
