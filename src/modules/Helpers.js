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


// function logic for joining the foreign keys in rollerCoaster table to values in other tables. 
export async function setResourcesMapFunction(setManufacturer, setRollerCoasters, setPark, setTrackType) {
  const rollerCoasters = ApiManager.getRollerCoasters;
  const manufacturers = ApiManager.getManufacturerWithRollerCoaster;
  const parks = ApiManager.getParkWithRollerCoasters;
  const trackTypes = ApiManager.getRollerCoastersWithTrackType;
  let values = await Promise.all([rollerCoasters(), manufacturers(), parks(), trackTypes()]);
  console.log(values);
  const returnedRollerCoastersObject = values[0];
  const returnedManufacturerObject = values[1];
  const returnedParksObject = values[2];
  const returnedTrackTypesObject = values[3];
  returnedRollerCoastersObject.forEach(rollerCoaster => {
    const manufacturerObject = returnedManufacturerObject.filter(manufacturer => manufacturer.id === rollerCoaster.manufacturerId);
    const parkObject = returnedParksObject.filter(park => park.id === rollerCoaster.parkId);
    const trackTypeObject = returnedTrackTypesObject.filter(trackType => trackType.id === rollerCoaster.trackTypeId);
    console.log("trackTypeObject", trackTypeObject);
    const id = rollerCoaster.id;
    const name = rollerCoaster.name;
    const max_height = rollerCoaster.max_height;
    const max_speed = rollerCoaster.max_speed;
    const trackType = trackTypeObject[0].name;
    const manufacturer = manufacturerObject[0].name;
    const park = parkObject[0].name;
    const userId = rollerCoaster.userId.name;
    const rollerCoasterObject = { id, name, max_height, max_speed, trackType, manufacturer, park, userId };
    console.log("rollerCoasterObject", rollerCoasterObject);
    setManufacturer(rollerCoasterObject);
    setRollerCoasters(rollerCoasterObject);
    setPark(rollerCoasterObject);
    setTrackType(rollerCoasterObject);
  });
}
