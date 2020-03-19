import React, { useState, useEffect } from "react";
import ApiManager from "../../modules/ApiManager";
import isEditCheck from "../../modules/Helpers";
import { useAuth0 } from "../../contexts/react-auth0-context";

const MessageForm = props => {
  const { loading, setLoading, user } = useAuth0();

  const [message, setMessage] = useState({ message: "" });

  const handleFieldChange = e => {
    const stateToChange = { ...message };
    stateToChange[e.target.id] = e.target.value;
    setMessage(stateToChange);
  };

  const constructNewMessage = () => {
    if (message === "") {
      window.alert("Please input a post");
    } else {
      setLoading(true);

      const messageToPost = {
        userId: parseInt(user.id),
        message: message.message,
        timestamp: new Date().toLocaleString()
      };
      // If this is an edit, we need the id
      // and the timestamp should be what it was.
      // userId doesn't need to change because users
      // will not have a button to edit other users' messages
      return isEditCheck(props, messageToPost);
    }
  };

  const postEditedMessage = message => {
    // If the object has an id, it is an edit
    // so we put/update
    if (message.hasOwnProperty("id")) {
      return ApiManager.updatePut("messages", message);
    } else {
      // Otherwise, it is new, so we post
      return ApiManager.post("messages", message);
    }
  };
};
