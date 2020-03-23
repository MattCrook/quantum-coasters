import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";
import "./EditCreditForm.css";

const EditCreditForm = props => {
  const userProfileId = props.userProfile.id;

  const { user, history } = useAuth0();
  const [manufacturers, setManufacturers] = useState([]);
  const [trackTypes, setTrackTypes] = useState([]);
  const [parks, setParks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [credit, setCredit] = useState({
    name: "",
    trackTypeId: "",
    max_height: "",
    max_speed: "",
    parkId: "",
    manufacturerId: "",
    userProfileId: ""
  });

  const handleInputChange = event => {
    const stateToChange = { ...credit };
    stateToChange[event.target.id] = event.target.value;
    setCredit(stateToChange);
  };

  const updateExistingCredit = event => {
    event.preventDefault();
    setIsLoading(true);

    const editedCredit = {
      id: props.match.params.creditId,
      name: credit.name,
      trackTypeId: credit.trackTypeId,
      max_height: credit.max_height,
      max_speed: credit.max_speed,
      parkId: credit.park,
      manufacturerId: credit.manufacturer
    };

    ApiManager.update("tasks", editedCredit).then(() =>
      props.history.push("/tasks")
    );
  };

  //   useEffect(() => {
  //     ApiManager.get(props.match.params.creditId).then(task => {
  //       setTask(task);
  //       setIsLoading(false);
  //     });
  //   }, []);
};

export default EditCreditForm;
