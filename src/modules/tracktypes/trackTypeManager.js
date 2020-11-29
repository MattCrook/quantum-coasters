const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const trackTypeManager = {
  async getTrackTypes() {
    const resp = await fetch(`${remoteURL}/tracktypes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
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
        Authorization: "Bearer" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(resource),
    });
    return await data.json();
  },
  async getTrackTypeByByName(trackType) {
    const resp = await fetch(`${remoteURL}/tracktypes?name=${trackType}`, {
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

export default trackTypeManager;
