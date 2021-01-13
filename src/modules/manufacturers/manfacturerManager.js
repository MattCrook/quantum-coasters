const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const manufacturerManager = {
  async getAllManufacturers() {
    const resp = await fetch(`${remoteURL}/api/manufacturers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async retrieveManufacturer(id) {
    const resp = await fetch(`${remoteURL}/api/manufacturers/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async postNewManufacturer(resource) {
    const data = await fetch(`${remoteURL}/api/manufacturers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(resource),
    });
    return await data.json();
  },

  async getManufacturerByName(manufacturer) {
    const encodedName = encodeURIComponent(manufacturer);
    const resp = await fetch(`${remoteURL}/api/manufacturers?name=${encodedName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },
};

export default manufacturerManager;
