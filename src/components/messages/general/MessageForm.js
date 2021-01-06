import React, { useState, useEffect } from "react";
import messageManager from "../../../modules/messages/messageManager";
import { isEditCheck, handleFieldChangeHelper } from "../../../modules/Helpers";

const MessageForm = (props) => {

  const { userProfile, messages } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ message: "" });

  const handleFieldChange = handleFieldChangeHelper(message, setMessage);

  const dateFormatter = (dateString) => {
    return dateString.split("T")[0];
  };

  // If this is an edit, we need the id
  // and the timestamp should be what it was.
  // userId doesn't need to change because users
  // will not have a button to edit other users' messages
  // this function was extracted to module scope (in helpers directory)
  const constructNewMessage = () => {
    if (message === "") {
      window.alert("Please input a post");
    } else {
      setIsLoading(true);
      const messageToPost = {
        user_id: userProfile.id,
        message: message.message,
        timestamp: dateFormatter(new Date().toISOString()),
      };
      return isEditCheck(props, messageToPost);
    }
  };

  const postEditedMessage = (message) => {
    // If the object has an id, it is an edit
    // so we put/update
    if (message.hasOwnProperty("id")) {
      return messageManager.updateMessagesPut(message);
    } else {
      // Otherwise, it is new, so we post
      return messageManager.postMessage(message);
    }
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    e.stopPropagation();
    const constructedMessage = constructNewMessage(e);
    // Clears the form upon submission
    e.target.reset();
    // Defaults the messageToEdit state
    // so it doesn't continue "editing" on subsequent sends
    props.setMessageToEdit({ text: "", user_id: "", timestamp: "" });
    postEditedMessage(constructedMessage)
      // Gets the messages again and re-renders
      .then(props.getMessages)
      .then(setIsLoading(false));
  };

  useEffect(() => {
    if (props.messageToEdit.message) {
      setMessage(props.messageToEdit);
      // A "one-time" setting of the message field's value
      // when there's a new props.messageToEdit containing a message string
      // (which happens when the edit button is clicked)
      document.getElementById("message").value = props.messageToEdit.message;
    }
    setIsLoading(false);
  }, [props.messageToEdit]);

  return (
    <>
      <div className="message-container darker chat-input-container">
        <form className="chat-form" onSubmit={handleSubmit}>
          <fieldset className="chat-fieldset">
            <div className="chat-input-inner-container">
              <textarea
                className="chat-input"
                name="message"
                type="message"
                required
                onChange={handleFieldChange}
                id="message"
                placeholder="Send a Message to #General"
              />
              <button
                className="chat-send-button"
                type="submit"
                disabled={isLoading}
              >Send<i className="fas fa-share"></i></button>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="signature">
                <p>Made by <a href="https://matt-crook-io.now.sh/">Quantum Coasters</a> <i className="fas fa-trademark"></i>
                </p>
            </div>
    </>
  );
};

export default MessageForm;
