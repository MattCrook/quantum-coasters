import React from "react";
import "../styles/BulkRCForm.css";

const Form = (props) => {
  return (
    <>
      <form className="main_form_bulk_upload" onSubmit={props.confirm}>
        <div className="create_form_wrapper">
          <div className="title_form">Ride Details</div>
          <fieldset className="add_ride_bulk_upload_fieldset">
            <label className="bulk_upload_rollercoaster_label" htmlFor="rollerCoaster">
              Roller Coaster Name
            </label>
            <input
              className="form-input"
              type="text"
              id="rollerCoaster"
              ref={props.refs.rollerCoasterNameRef}
              required
            />
            <div className="form_ul">
              <li className="form_li">Please use full official ride name.</li>
              <li className="form_li">Double check spelling is correct!</li>
            </div>
            <label className="bulk_upload_rollercoaster_label" htmlFor="track">
              Track Type
            </label>
            <select className="form-input" id="track" ref={props.refs.trackTypeRef} required>
              {props.trackTypes.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.name}
                </option>
              ))}
            </select>
            <label className="bulk_upload_rollercoaster_label" htmlFor="height">
              Max Height
            </label>
            <input className="form-input" type="text" id="height" ref={props.refs.maxHeightRef} required />
            <div className="form_ul">
              <li className="form_li">All Measurements done in feet.</li>
              <li className="form_li">
                No need to put the measurement identifier, i.e. ft or feet, or any other Imperial measurement system
                identifier.
              </li>
              <li className="form_li">
                Simply put the number, (For example - 100), and we will calculate and expect the number to mean 100
                feet.
              </li>
            </div>
            <label className="bulk_upload_rollercoaster_label" htmlFor="speed">
              Max Speed
            </label>
            <input className="form-input" type="text" id="speed" ref={props.refs.maxSpeedRef} required />
            <div className="form_ul">
              <li className="form_li">All Measurements done in Miles Per Hour (mph).</li>
              <li className="form_li">
                No need to put the speed unit of measurement.
              </li>
              <li className="form_li">
                Simply put the number, (For example - 65), and we will calculate and expect the number to mean 65mph.
              </li>
            </div>
            <label className="bulk_upload_rollercoaster_label" htmlFor="parkName">
              Park Name
            </label>
            <div className="form-input" id="parkName">
              {props.park.name}
                      </div>
                      <div className="form_ul">
                          <li id="warning_form_correct_park" className="form_li">Please be sure this is the park you intend to bulk add rides to.</li>
                          <li className="form_li">Otherwise, go back and select the park for which you intended to bulk add rides.</li>

            </div>
            <label className="bulk_upload_rollercoaster_label" htmlFor="manufacturer">
              Manufacturer
            </label>
            <select className="form-input" id="manufacturer" ref={props.refs.manufacturerRef} required>
              {props.manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
            <button
              className="submit_bulk_upload"
              type="submit"
              disabled={props.IsLoading}
            //   onClick={() => props.confirm()}
            >
              Confirm
            </button>
          </fieldset>
      <div className="signature">
        <p id="signature_font_form">
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
        </div>
      </form>
    </>
  );
};

export default Form;
