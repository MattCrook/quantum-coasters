const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const manufacturerManager = {
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

  async getManufacturerByName(manufacturer) {
    const encodedName = encodeURIComponent(manufacturer);
    const resp = await fetch(`${remoteURL}/manufacturers?name=${encodedName}`, {
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

export default manufacturerManager;
