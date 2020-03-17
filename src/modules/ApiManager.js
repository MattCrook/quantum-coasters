const remoteURL = "http://localhost:8200";

const ApiManager = {
  async getAllProfiles() {
    const resp = await fetch(`${remoteURL}/users`);
    return await resp.json();
  },
  async getProfile(id) {
    const resp = await fetch(`${remoteURL}/users/${id}`);
    return await resp.json();
  },
  async getAllUserCredits(id) {
    const resp = await fetch(
      `${remoteURL}/users/${id}?_embed=rollerCoasters&userId=${id}`
    );
    return await resp.json();
  },
  async post(newUser) {
    const data = await fetch(`${remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    });
    return await data.json();
  }
};
export default ApiManager;
