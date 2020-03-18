const Url = "http://localhost:8200";

const ApiManager = {
  async GetData(resource) {
    const response = await fetch(`${Url}/resource`);
    return await response.json();
  }
};
export default ApiManager;
