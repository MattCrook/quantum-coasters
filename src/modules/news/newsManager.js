const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const newsManager = {
  async getSectionContent(section) {
    const resp = await fetch(`${remoteURL}/news?content=${section}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },
  async fetchAllUserArticles() {
    const resp = await fetch(`${remoteURL}/news?content=user_articles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },
  async postUserBlogApplication(data) {
    const response = await fetch(`${remoteURL}/contributor_applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "JWT" + localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  },
};

export default newsManager;
