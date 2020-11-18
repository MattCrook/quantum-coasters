const remoteURL = process.env.REACT_APP_BASE_URL;

const userManager = {
  async register(userToPost) {
    const data = await fetch(`${remoteURL}/rest-auth/registration/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      Accept: "application/json",
      body: JSON.stringify(userToPost),
    });
    return await data.json();
  },

  async login(userCredentials) {
  const result = await fetch(`${remoteURL}/rest-auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  });
  return await result.json();
},


  async getAuthUserById(id) {
    const resp = await fetch(`${remoteURL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async getAllUsers() {
    const resp = await fetch(`${remoteURL}/userprofiles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async getUserProfileEmbeddedAuthUser(userId) {
    const resp = await fetch(`${remoteURL}/userprofiles?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // can change back to 'application/x-www-form-urlencoded'
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async getAuthUser(email) {
    const resp = await fetch(`${remoteURL}/userprofiles?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json", // can change back to 'application/x-www-form-urlencoded'
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async deleteUserProfile(id) {
    console.log("****************");
    const result = await fetch(`${remoteURL}/userprofiles/${id}`, {
      method: "DELETE",
    });
    return await result.json();
  },

  async putEditedUserProfile(editedObject) {
    const data = await fetch(`${remoteURL}/userprofiles/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(editedObject),
    });
  },

  async putEditedAuthUser(editedObject) {
    const data = await fetch(`${remoteURL}/users/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(editedObject),
    });
  },
};

export default userManager;
