const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const messageManager = {
  async getAllMessages() {
    const resp = await fetch(`${remoteURL}/api/messages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async updateMessagesPut(editedObject) {
    await fetch(`${remoteURL}/api/messages/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(editedObject),
    });
  },

  async postMessage(newObject) {
    const data = await fetch(`${remoteURL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newObject),
    });
    return await data.json();
  },
};

export default messageManager;
