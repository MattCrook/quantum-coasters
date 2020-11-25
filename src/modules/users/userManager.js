const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const userManager = {
  async register(userToPost) {
    // const data = await fetch(`${remoteURL}/rest-auth/registration/`, {
      const data = await fetch(`${remoteURL}/register/`, {
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
    // const result = await fetch(`${remoteURL}/rest-auth/login/`, {
      const result = await fetch(`${remoteURL}/accounts/login/`, {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    });
    return await result.json();
  },

  async loginSocialAuth(provider) {
    const result = await fetch(`${remoteURL}/social-auth/login/${provider}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      Accept: "application/json",
    });
    return await result.json();
  },

  async getAuthUserById(id) {
    const resp = await fetch(`${remoteURL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + sessionStorage.getItem("accessToken"),
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
        Authorization: "JWT " + sessionStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async getUserProfileEmbeddedAuthUser(userId) {
    const resp = await fetch(`${remoteURL}/userprofiles?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + sessionStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },

  async getAuthUser(email) {
    const resp = await fetch(`${remoteURL}/userprofiles?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("QuantumToken"),
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
        Authorization: "JWT " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(editedObject),
    });
  },

  async putEditedAuthUser(editedObject) {
    await fetch(`${remoteURL}/users/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(editedObject),
    });
  },
  async getInitAppOptions(authUserId) {
    const resp = await fetch(`${remoteURL}/credentials?user_id=${authUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT " + sessionStorage.getItem("accessToken"),
      },
    });
    return await resp.json();
  },
  async postInitAppOptions(initOptionsData) {
    try {
      const response = await fetch(`${remoteURL}/credentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT " + sessionStorage.getItem("accessToken"),
        },
        body: JSON.stringify(initOptionsData),
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Request Failed");
    } catch (err) {
      console.log(err);
    }
  },
  async patchQuantumTokenOnLogin(data) {
    try {
      await fetch(`${remoteURL}/credentials/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: "Bearer " + sessionStorage.getItem("QuantumToken"),
        },
        Accept: "application/json",
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log({err});
    }
  },
};

export default userManager;
