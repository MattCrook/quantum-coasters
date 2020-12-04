import manufacturerManager from "./manufacturers/manfacturerManager";
import parkManager from "./parks/parkManager";
import trackTypeManager from "./tracktypes/trackTypeManager";



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
};



// helper to be called inside { useEffect } to call async functions, handle the returned data
// and set the current state of its parameters
export function setResourceStateHelperFunction(setManufacturers, setTrackTypes, setParks, setIsLoading) {
  manufacturerManager.getAllManufacturers().then(manufacturers => {
    trackTypeManager.getTrackTypes().then(trackTypes => {
      parkManager.getParks().then(parks => {
        setManufacturers(manufacturers);
        setTrackTypes(trackTypes);
        setParks(parks);
        setIsLoading(false);
      });
    });
  });
};

export function parseUserAgent(userAgent, setBrowserData, setUserAgentData) {
  if (userAgent.includes("Firefox/")) {
    // console.log("FireFox");
    // console.log(`Firefox v${userAgent.split("Firefox/")[1]}`);
    const agentData = `Firefox v${userAgent.split("Firefox/")[1]}`;
    setBrowserData("FireFox");
    setUserAgentData(agentData);
  } else if (userAgent.includes("Edg/")) {
    // console.log("Edge (Chromium)");
    // console.log(`Edge v${userAgent.split("Edg/")[1]}`);
    const agentData = `Edge v${userAgent.split("Edg/")[1]}`;
    setBrowserData("Edge (Chromium)");
    setUserAgentData(agentData);
  } else if (userAgent.includes("Chrome/")) {
    // console.log("Chrome");
    // console.log(`Chrome v${userAgent.split("Chrome/")[1]}`);
    const agentData = `Chrome v${userAgent.split("Chrome/")[1]}`;
    setBrowserData("Chrome");
    setUserAgentData(agentData);
  } else if (userAgent.includes("Safari/")) {
    // console.log("Safari");
    // console.log(`Safari v${userAgent.split("Safari/")[1]}`);
    const agentData = `Safari v${userAgent.split("Safari/")[1]}`;
    setBrowserData("Safari");
    setUserAgentData(agentData);
  } else {
    console.log("Not Able to Parse UserAgent");
  }
};
