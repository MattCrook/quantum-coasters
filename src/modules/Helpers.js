// function to check If this is an edit, we need the id and the timestamp should be what it was.
// userId doesn't need to change because users will not have a button to edit other users' messages
export function isEditCheck(props, messageToPost) {
  if (props.messageToEdit.id) {
    messageToPost.id = props.messageToEdit.id;
    messageToPost.timestamp = props.messageToEdit.timestamp;
  }
  return messageToPost;
}


// Helper function to wrap event.target.value when setting state to change. When user selects...
// was putting number in Json server as string. 
// This function type checks the input. Ex) Number("1") // 1
export function formatInput(target) {
  if (target.id === "parkId" || target.id === "manufacturerId" || target.id === "trackTypeId") {
    return Number(target.value)
  } else {
    return target.value;
  }
};


// Helper function to watch the state of user typing in input fields on new rollerCoaster form. Extracted to reduce repeated logic.
export function handleFieldChangeHelper(currentState, setCurrentState) {
  return e => {
    const stateToChange = { ...currentState };
    stateToChange[e.target.id] = e.target.value;
    setCurrentState(stateToChange);
  };
}
  // const handleRollerCoasterFieldChange = e => {
  //   const stateToChange = { ...rollerCoaster };
  //   stateToChange[e.target.id] = e.target.value;
  //   setRollerCoaster(stateToChange);
  // };

  // const handleParkFieldChange = e => {
  //   const stateToChange = { ...park };
  //   stateToChange[e.target.id] = e.target.value;
  //   setPark(stateToChange);
  // };

  // const handleManufacturerFieldChange = e => {
  //   const stateToChange = { ...manufacturer };
  //   stateToChange[e.target.id] = e.target.value;
  //   setManufacturer(stateToChange);
  // };
