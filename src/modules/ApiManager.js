const remoteURL = "http://localhost:8200";

const ApiManager = {
  async getAllProfiles() {
    const resp = await fetch(`${remoteURL}/users`);
    return await resp.json();
  },
  async getProfile(id) {
    const resp = await fetch(`${remoteURL}/users/${id}`);
    return await resp.json();
  },
  async getAllUserCredits(id) {
    const resp = await fetch(
      `${remoteURL}/users/${id}?_embed=rollerCoasters`
    );
    return await resp.json();
  },
  async post(newUser) {
    const data = await fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    return await data.json();
  },
  async postNewRollerCoaster(resource) {
    const data = await fetch(`${remoteURL}/rollerCoasters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resource)
    });
    return await data.json();
  },
  async getUser() {
    const resp = await fetch(`${remoteURL}/users`);
    return await resp.json();
  },
  async getAllManufacturers() {
    const resp = await fetch(`${remoteURL}/manufacturers`);
    return await resp.json();
  },
  async getAllMessages() {
    const resp = await fetch(`${remoteURL}/messages`);
    return await resp.json();
  },
  async updateMessagesPut(editedObject) {
    const data = await fetch(`${remoteURL}/messages/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedObject)
    });
    return await data.json();
  },
  async postMessage(newObject) {
    const data = await fetch(`${remoteURL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newObject)
    });
    return await data.json();
  },
};
export default ApiManager;
