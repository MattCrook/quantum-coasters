import React from "react";
import "../styles/BulkRCForm.css";

const Form = (props) => {
  return (
    <>
      <button className="back_to_previous" onClick={() => props.hideForm()}>
        &lt; Back To Previous
      </button>
      <form className="main_form_bulk_upload" onSubmit={props.submitForm}>
        <div className="create_form_wrapper">
          <h3 className="title">Input Ride Details</h3>
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
            <label className="bulk_upload_rollercoaster_label" htmlFor="speed">
              Max Speed
            </label>
            <input className="form-input" type="text" id="speed" ref={props.refs.maxSpeedRef} required />
            <label className="bulk_upload_rollercoaster_label" htmlFor="parkName">
              Park Name
            </label>
            <div className="form-input" id="parkName">
              {props.park.name}
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
              onClick={() => props.hideForm()}
            >
              Confirm
            </button>
          </fieldset>
        </div>
      </form>
      <div className="signature">
        <p>
          Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
        </p>
      </div>
    </>
  );
};

export default Form;
