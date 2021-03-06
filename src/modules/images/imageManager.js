const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const imageManager = {
  async getAuthUserImage(imageId) {
    const resp = await fetch(`${remoteURL}/api/images/${imageId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async postNewImage(imageObject) {
    // Note: Content-type cannot be set when uploading a file
    const headers = {
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    };
    const response = await fetch(`${remoteURL}/api/images`, {
      method: "POST",
      headers: headers,
      body: imageObject,
    });
    return await response.json();
  },

  async updateUserProfileImage(imageObject) {
    const data = await fetch(`${remoteURL}/api/images/${imageObject.id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: imageObject,
    });
    return await data.json();
  },
};

export default imageManager;
