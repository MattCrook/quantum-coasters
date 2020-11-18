import React, { useState} from "react";
import MiniProfileCard from "./MiniProfileCard";
import "./Profile.css";

const UserCreditsByPark = (props) => {
  console.log(props);
  const [rollerCoasters, setRollerCoasters] = useState([]);
  const userRollerCoasters = props.userRollerCoasters;
  const parks = new Set();

  if (userRollerCoasters) {
    userRollerCoasters.forEach((rc) => {
      parks.add(rc.park.name);
    });
  }

  const handleShowCredits = (parkName) => {
    let rollercoasters = [];
    for (let i of userRollerCoasters) {
      const park = i.park.name;
      if (parkName === park.toString()) {
        rollercoasters.push(i);
      }
    }
    setRollerCoasters(rollercoasters);
  };

  return (
    <>
      <div className="credits_by_park_container">
        <div id="parks_been_to_list">
          {[...parks].map((park, i) => (
            <li className="credits_by_park_list_item" key={i}>
              <a className="credits_by_park_park_name" onClick={() => handleShowCredits(park)}>
                {park}
              </a>
            </li>
          ))}
        </div>

          {rollerCoasters.length > 0 && (
            <div className="ride_list_for_current_park">
              {rollerCoasters.map((rollerCoaster) => (
                <MiniProfileCard
                  key={rollerCoaster.id}
                  userProfile={props.userProfile}
                  authUser={props.authUser}
                  rollerCoaster={rollerCoaster}
                  manufacturer={rollerCoaster.manufacturer}
                  park={rollerCoaster.park}
                  trackType={rollerCoaster.tracktype}
                  deleteCredit={props.deleteCredit}
                  {...props}
                />
              ))}
            </div>
          )}

      </div>
    </>
  );
};

export default UserCreditsByPark;
