import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import { useAuth0 } from "../../contexts/react-auth0-context";

const AddNewRollerCoaster = () => {
  const [rollerCoaster, setRollerCoaster] = useState({
    name: "",
    trackType: "",
    max_height: "",
    max_speed: "",
    park: "",
    manufacturer: "",
    userId: ""
  });
  const { loading, user } = useAuth0();

  const handleFieldChange = e => {

  };
};
