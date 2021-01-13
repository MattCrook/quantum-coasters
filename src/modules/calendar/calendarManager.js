const remoteURL = process.env.REACT_APP_REMOTE_API_URL;

const calendarManager = {
  async getUserCalendarEvents(userId) {
    const resp = await fetch(`${remoteURL}/api/calendar_events?user_id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      Accept: "application/json",
    });
    return await resp.json();
  },

  async postUserCalendarEvent(event) {
    try {
      const response = await fetch(`${remoteURL}/api/calendar_events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
        },
        body: JSON.stringify(event),
      });
      if (response.ok) {
        return await response.json();
      }
      throw new Error("Request Failed");
    } catch (err) {
      console.log(err);
    }
  },

  async updateEvent(editedEvent) {
    return await fetch(`${remoteURL}/api/calendar_events/${editedEvent.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(editedEvent),
    });
  },

  async deleteEvent(id) {
    return await fetch(`${remoteURL}/api/calendar_events/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + sessionStorage.getItem("accessToken"),
      },
    });
  },
};

export default calendarManager;
