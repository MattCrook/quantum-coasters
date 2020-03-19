export function isEditCheck(props, messageToPost) {
  if (props.messageToEdit.id) {
    messageToPost.id = props.messageToEdit.id;
    messageToPost.timestamp = props.messageToEdit.timestamp;
  }
  return messageToPost;
}

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
