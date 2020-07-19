const remoteURL = "http://localhost:8000";
// const remoteURL = process.env.REACT_APP_BASE_URL;

const rollerCoasterManager = {
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

  async getRollerCoastersByParkId(parkId) {
    const data = await fetch(`${remoteURL}/rollercoasters?park_id=${parkId}`, {
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
};

export default rollerCoasterManager;
