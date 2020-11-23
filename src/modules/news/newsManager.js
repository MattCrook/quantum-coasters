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
};

export default newsManager;
