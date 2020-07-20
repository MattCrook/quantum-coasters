import React, { useState, useEffect } from "react";
import parkManager from "../../modules/parks/parkManager";
import { Link } from "react-router-dom";

// list that user is taken to, to input new credit (new rollercoaster ridden)
// need check to see if the roller coaster exists in DB, if not user is taken to NewRollerCoasterForm
// to create the entry in DB, then back to their credit form to fill it out.
const ParkList = () => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    const parksFromAPI = async () => {
      const getAllParks = await parkManager.getParks();
      setParks(getAllParks);
    };
    parksFromAPI();
  }, []);

  return (
    <>
      <div className="park-coaster-list-container">
        <ul className="park-list-items-container">
          <div className="parks_list_title">Parks</div>
          {parks &&
            parks.map((park) => (
              <li className="park-list-elements" key={park.id}>
                <Link
                  className="park_list_item_link"
                  to={`/rollerCoasters/park/${park.id}`}
                >
                  {park.name}
                </Link>
                <div className="park_list_location_and_country">
                  {park.parkLocation}, {park.parkCountry}{" "}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};
export default ParkList;
