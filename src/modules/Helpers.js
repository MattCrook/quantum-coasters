// function to check If this is an edit, we need the id and the timestamp should be what it was.
// userId doesn't need to change because users will not have a button to edit other users' messages
export function isEditCheck(props, messageToPost) {
  if (props.messageToEdit.id) {
    messageToPost.id = props.messageToEdit.id;
    messageToPost.timestamp = props.messageToEdit.timestamp;
  }
  return messageToPost;
}

// handle submit for messages helper function logic (edit message function logic)
export function handleSubmitHelperFunction(
  setLoading,
  constructNewMessage,
  props,
  postEditedMessage
) {
  return e => {
    setLoading(true);
    e.preventDefault();
    e.stopPropagation();
    const constructedMessage = constructNewMessage(e);
    // Clears the form upon submission
    e.target.reset();
    // Defaults the messageToEdit state
    // so it doesn't continue "editing" on subsequent sends
    props.setMessageToEdit({ text: "", userId: 0, timestamp: "" });
    postEditedMessage(constructedMessage)
      // Gets the messages again and re-renders
      .then(props.getMessages)
      .then(setLoading(false));
  };
}
