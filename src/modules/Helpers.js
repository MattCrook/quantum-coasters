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
// export async function setResourcesJoinFunction(rollerCoasters) {
//   const rollerCoastersFromAPI = ApiManager.getRollerCoasters;
//   const manufacturers = ApiManager.getManufacturerWithRollerCoaster;
//   const parks = ApiManager.getParkWithRollerCoasters;
//   const trackTypes = ApiManager.getRollerCoastersWithTrackType;
//   let values = await Promise.all([rollerCoastersFromAPI(), manufacturers(), parks(), trackTypes()]);
//   console.log(values);
//   const returnedRollerCoastersArray = values[0];
//   console.log("returnedRollerCoastersArray", returnedRollerCoastersArray)
//   const returnedManufactureArray = values[1];
//   const returnedParksArray = values[2];
//   const returnedTrackTypesArray = values[3];
//   returnedRollerCoastersArray.map(rollerCoaster => {
//     const manufacturerArray = returnedManufactureArray.filter(manufacturer => manufacturer.id === rollerCoaster.manufacturerId);
//     const parkArray = returnedParksArray.filter(park => park.id === rollerCoaster.parkId);
//     const trackTypeArray = returnedTrackTypesArray.filter(trackType => trackType.id === rollerCoaster.trackTypeId);
//     console.log("trackTypeArray", trackTypeArray);
//     const id = rollerCoaster.id;
//     const name = rollerCoaster.name;
//     const max_height = rollerCoaster.max_height;
//     const max_speed = rollerCoaster.max_speed;
//     const trackType = trackTypeArray[0].name;
//     const manufacturer = manufacturerArray[0].name;
//     const park = parkArray[0].name;
//     const userId = rollerCoaster.userId.name;
//     const rollerCoasterObject = { id, name, max_height, max_speed, trackType, manufacturer, park, userId };
//     console.log("rollerCoasterObject", rollerCoasterObject);
//     return rollerCoasters.concat(rollerCoasterObject)
//     setRollerCoasters(rollerCoasterObject);
//     setManufacturer(rollerCoasterObject.manufacturer);
//     setPark(rollerCoasterObject.park);
//     setTrackType(rollerCoasterObject.trackType);
//   });
// }
