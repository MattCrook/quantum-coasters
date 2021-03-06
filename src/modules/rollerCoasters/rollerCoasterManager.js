const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const rollerCoasterManager = {
  async getRollerCoastersWithAllExpanded(id) {
    const resp = await fetch(`${remoteURL}/api/rollercoasters/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async getAllRollerCoastersWithAllExpanded() {
    const resp = await fetch(`${remoteURL}/api/rollercoasters`);
    return await resp.json();
  },

  async getRollerCoastersForUserProfile(id) {
    const data = await fetch(`${remoteURL}/api/rollercoasters/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return await data.json();
  },

  async getRollerCoastersByParkId(parkId) {
    const data = await fetch(`${remoteURL}/api/rollercoasters?park_id=${parkId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return await data.json();
  },

  async postNewRollerCoaster(resource) {
    const data = await fetch(`${remoteURL}/api/rollercoasters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resource),
    });
    return await data.json();
  },

  async sendBulkSubmit(queryset) {
    const data = await fetch(`${remoteURL}/api/rollercoasters`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(queryset),
    });
    return await data.json();
  },
};

export default rollerCoasterManager;
