const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

export async function postActivityLog(payload) {
  const resp = await fetch(`${remoteURL}/api/activity_log`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify(payload),
  });
  return await resp.json();
}

export async function getUserActivityLog(userId) {
  const resp = await fetch(`${remoteURL}/api/activity_log?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
  });
  return await resp.json();
}

export async function postLoginInfo(payload) {
  const resp = await fetch(`${remoteURL}/api/login_info`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    body: JSON.stringify(payload),
  });
  return await resp.json();
}

export async function getLoginInfo(userId) {
  const resp = await fetch(`${remoteURL}/api/login_info?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
  });
  return await resp.json();
}

export async function retrieveActivityLog(id) {
  const resp = await fetch(`${remoteURL}/api/activity_log/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
  });
  return await resp.json();
}

export async function retrieveLoginInfo(id) {
  const resp = await fetch(`${remoteURL}/api/login_info/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
  });
  return await resp.json();
}

export async function postErrorLog(payload) {
  const resp = await fetch(`${remoteURL}/api/error_logs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
    body: JSON.stringify(payload),
  });
  return await resp.json();
}

export async function retrieveErrorLog(id) {
  const resp = await fetch(`${remoteURL}/api/error_logs/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
  });
  return await resp.json();
}

export async function getUserErrorLog(userId) {
  const resp = await fetch(`${remoteURL}/api/error_logs?user_id=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
  });
  return await resp.json();
}

export async function postFeedback(payload) {
  try {
    const resp = await fetch(`${remoteURL}/api/user_feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      Accept: "application/json",
      body: JSON.stringify(payload),
    });
    return await resp.json();
  } catch (error) {
    console.log(error)
  }
}

export async function postBugReport(payload) {
  const resp = await fetch(`${remoteURL}/api/bug_reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
    body: JSON.stringify(payload),
  });
  return await resp.json();
}

export async function sendAppLoginData(payload) {
  const response = await fetch(`${remoteURL}/api/app_login_data`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
    },
    Accept: "application/json",
    body: JSON.stringify(payload),
  });
  return await response.json();
}
