const remoteURL = "http://localhost:8000";
// const remoteURL = process.env.REACT_APP_BASE_URL;

const userManager = {
  async register(userToPost) {
    const data = await fetch(`${remoteURL}/rest-auth/registration/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "JWT " + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
      body: JSON.stringify(userToPost),
    });
    return await data.json();
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

  async putEditedAPIUser(editedObject) {
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

// async register(newUser) {
//   // Note: Content-type cannot be set when uploading a file
//   const headers = {
//     Authorization: "JWT" + localStorage.getItem("accessToken"),
//   };
//   // If there is no image,
//   // then content-type and accept are needed in the fetch call
//   if (newUser.image === null) {
//     headers["Accept"] = "application/json";
//     headers["Content-Type"] = "application/json";
//   }

//   const response = await fetch(`${remoteURL}/register/`, {
//     method: "POST",
//     headers: headers,
//     body: newUser,
//   });
//   return await response.json();
// },

// async login(userToLogin) {
//   const result = await fetch(`${remoteURL}/login/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userToLogin),
//   });
//   return await result.json();
// },
