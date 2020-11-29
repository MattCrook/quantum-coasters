const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const parkManager = {
  async postNewPark(resource) {
    const data = await fetch(`${remoteURL}/parks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
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
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async getParkByName(park) {
    const resp = await fetch(`${remoteURL}/parks?name=${park}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async retrievePark(parkId) {
    const resp = await fetch(`${remoteURL}/parks/${parkId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },
};

export default parkManager;
