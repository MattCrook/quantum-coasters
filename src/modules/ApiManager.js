const remoteURL = "http://localhost:8000";
// const remoteURL = process.env.REACT_APP_BASE_URL;

const ApiManager = {
  /************* USERS ********************/

  async getAllUsers() {
    const resp = await fetch(`${remoteURL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async getUserProfile(email) {
    const resp = await fetch(`${remoteURL}/users?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // can change back to 'application/x-www-form-urlencoded'
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async postNewUserProfile(newUser) {
    const data = await fetch(`${remoteURL}/userprofiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newUser),
    });
    const result = await data.json();
    return result;
  },

  async deleteUserProfile(id) {
    console.log("****************");
    const result = await fetch(`${remoteURL}/userprofiles/${id}`, {
      method: "DELETE",
    });
    return await result.json();
  },

  async deleteCredit(id) {
    return await fetch(`${remoteURL}/credits/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
    });
  },

  async addCredit(creditObj) {
    const data = await fetch(`${remoteURL}/credits`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(creditObj),
    });
    return await data.json();
  },

  async updateCredit(editedObject) {
    return fetch(`${remoteURL}/userprofiles/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedObject),
    }).then((data) => data.json());
  },

  async getCreditIdFromApi() {
    const data = await fetch(`${remoteURL}/credits`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
    });
    return await data.json();
  },
  async putEditedProfile(editedObject) {
    return fetch(`${remoteURL}/userprofiles/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedObject),
    }).then((data) => data.json());
  },

  /*********** ROLLERCOASTERS ************/

  async getRollerCoastersWithAllExpanded(id) {
    const resp = await fetch(`${remoteURL}/rollercoasters/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async getAllRollerCoastersWithAllExpanded() {
    const resp = await fetch(`${remoteURL}/rollercoasters`);
    return await resp.json();
  },

  async getRollerCoastersForUserProfile(id) {
    const data = await fetch(`${remoteURL}/rollercoasters/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
    });
    return await data.json();
  },

  async postNewRollerCoaster(resource) {
    const data = await fetch(`${remoteURL}/rollercoasters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });
    return await data.json();
  },

  /************************ PARKS *********************/

  async postNewPark(resource) {
    const data = await fetch(`${remoteURL}/parks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(resource),
    });
    return await data.json();
  },

  async getParks() {
    const resp = await fetch(`${remoteURL}/parks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  /******************** MANUFACTURERS ********************/

  async getAllManufacturers() {
    const resp = await fetch(`${remoteURL}/manufacturers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async postNewManufacturer(resource) {
    const data = await fetch(`${remoteURL}/manufacturers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(resource),
    });
    return await data.json();
  },

  /*********************** TRACK TYPES ******************/

  async getTrackTypes() {
    const resp = await fetch(`${remoteURL}/tracktypes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async postNewTrackType(resource) {
    const data = await fetch(`${remoteURL}/tracktypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(resource),
    });
    return await data.json();
  },

  /***************** MESSAGES ********************/

  async getAllMessages() {
    const resp = await fetch(`${remoteURL}/messages?_expand=user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async updateMessagesPut(editedObject) {
    const data = await fetch(`${remoteURL}/messages/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(editedObject),
    });
    return await data.json();
  },

  async postMessage(newObject) {
    const data = await fetch(`${remoteURL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newObject),
    });
    return await data.json();
  },

  /******************** Database Check API calls on AddNewForm ***********************/

  async getParkByName(park) {
    const resp = await fetch(`${remoteURL}/parks?name=${park}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async getManufacturerByName(manufacturer) {
    const resp = await fetch(`${remoteURL}/manufacturers?name=${manufacturer}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "JWT" + localStorage.getItem("accessToken"),
        },
        Accept: "application/json",
      }
    );
    return await resp.json();
  },

  async getTrackTypeByByName(trackType) {
    const resp = await fetch(`${remoteURL}/tracktypes?name=${trackType}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },
};

export default ApiManager;
