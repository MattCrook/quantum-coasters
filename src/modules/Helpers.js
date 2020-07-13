import ApiManager from "./ApiManager";

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
    console.log(stateToChange)
    stateToChange[e.target.id] = e.target.value;
    setCurrentState(stateToChange);
  };
};



// helper to be called inside { useEffect } to call async functions, handle the returned data
// and set the current state of its parameters
export function setResourceStateHelperFunction(setManufacturers, setTrackTypes, setParks, setIsLoading) {
  ApiManager.getAllManufacturers().then(manufacturers => {
    ApiManager.getTrackTypes().then(trackTypes => {
      ApiManager.getParks().then(parks => {
        setManufacturers(manufacturers);
        setTrackTypes(trackTypes);
        setParks(parks);
        setIsLoading(false);
      });
    });
  });
};
