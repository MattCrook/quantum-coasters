import React, { useState, useEffect } from "react";
import parkManager from "../../modules/parks/parkManager";
// import { useActivityLog } from "../../contexts/ActivityLogContext";
import Parks from "./pages/Parks";
import NavHeader from "../nav/NavHeader";
import MicroModal from "micromodal";
import "./styles/BulkRCForm.css";
// import ParkList from "./RollerCoasterList";
// import CustomizedInputBase from "../search/CustomizedInputBase";
// import "../styles/NewCreditForm.css";

const ParkListForBulkSubmit = (props) => {
  // const { postActivityLogCreateRollerCoster } = useActivityLog();
  // const { authUser } = props;
  // const { userProfile } = props;
  // const [parks, setParks] = useState([]);
  const [allParks, setAllParks] = useState([]);

  const showModal = () => {
    MicroModal.init({
      openTrigger: "data-micromodal-trigger",
      closeTrigger: "data-micromodal-close",
      openClass: "is-open",
      disableScroll: true,
      disableFocus: false,
      awaitOpenAnimation: true,
      awaitCloseAnimation: false,
      debugMode: true,
    });
  };


  useEffect(() => {
    const parksFromAPI = async () => {
      const getAllParks = await parkManager.getParks();
      // setParks(getAllParks);
      setAllParks(getAllParks);
      showModal();
    };
    parksFromAPI();
  }, []);

  return (
    <>
      <NavHeader {...props} />
      <button className="back_to_previous" onClick={() => props.history.push("/user/parks/addcredit")}>
        &lt; Back To Previous
      </button>
      <div className="parks_title_wrapper">
        <div className="parks_title">Select A Park to Bulk Add Rides To</div>
        <a href="#info_add_park_modal" data-micromodal-trigger="info_add_park_modal" aria-label="Add New Park">
        <i id="info_add_park_button" className="fas fa-info-circle"></i>
        </a>
      </div>
      <div className="parks_bulkform_main_container">
        {allParks.map((park) => (
          <Parks key={park.id} park={park} {...props} />
        ))}
      </div>

      <div className="modal micromodal-slide" id="info_add_park_modal" aria-hidden="true">
      <div className="add_park_modal__overlay" tabIndex="-1" data-micromodal-close>
        <div className="add_park_modal__container" role="dialog" aria-modal="true" aria-labelledby="add_park_modal_title">
          <header className="add_park_modal__header">
            <h2 className="add_park_modal__title" id="add_park_modal_title">
              Add New Park
            </h2>
            <button className="add_park_modal__close" aria-label="Close modal" data-micromodal-close></button>
          </header>

          <main className="add_park_modal__content" id="add_park_modal_title_content">
            <div className="new_form" id="new_park_modal">
                <div className="add_park_content_container">
                  <div className="header_help_text">Don't see the park you're trying to submit to listed? Click below and fill out our New Park submission form.</div>
                  <div className="new_park_link_wrapper">
                    <div className="new_park_link_button" onClick={() => props.history.push("new/rollercoaster/parks/create")}>New Park Submission Form <i className="fas fa-long-arrow-alt-right"></i></div>
                  </div>
              </div>
            </div>

            <div className="signature">
              <p id="signature_font">
                Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a>{" "}
                <i className="fas fa-trademark"></i>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
    </>
  );
};

export default ParkListForBulkSubmit;
