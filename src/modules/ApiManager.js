const remoteURL = "http://localhost:8200";

const ApiManager = {
  async getAllProfiles() {
    const resp = await fetch(`${remoteURL}/users`);
    return await resp.json();
  },
  async getProfile(id) {
    const resp = await fetch(`${remoteURL}/users/${id}`);
    return await resp.json();
  }
};
export default ApiManager;
