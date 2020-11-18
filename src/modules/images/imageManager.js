const remoteURL = process.env.REACT_APP_BASE_URL;

const imageManager = {
  async getAuthUserImage(imageId) {
    const resp = await fetch(`${remoteURL}/images/${imageId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async postNewImage(imageObject) {
    // Note: Content-type cannot be set when uploading a file
    const headers = {
      Authorization: "JWT" + localStorage.getItem("accessToken"),
    };
    const response = await fetch(`${remoteURL}/images`, {
      method: "POST",
      headers: headers,
      body: imageObject,
    });
    return await response.json();
  },

  async updateUserProfileImage(imageObject) {
    const data = await fetch(`${remoteURL}/images/${imageObject.id}`, {
      method: "PUT",
      headers: {
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: imageObject,
    });
    const result = await data.json();
    return result;
  },
};

export default imageManager;
