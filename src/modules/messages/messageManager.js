const remoteURL = process.env.REACT_APP_BASE_URL;

const messageManager = {
  async getAllMessages() {
    const resp = await fetch(`${remoteURL}/messages`, {
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
    // return await data.json();
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
};

export default messageManager;
