import axios from "../../components/chat/axios";

// const API_URL = "http://localhost:5000/api/";
const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";
// const API_URL = "https://events.i-techrity.tn/backendEvents/api/";

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("api/event/add", eventData, config);

  return response.data;
};

// Get events
const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get( "api/event", config);
  return response.data;
};

// Delete event
const deleteEvent = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("api/event/delete/" + data, config);

  return response.data;
};
const eventService = {
  createEvent,
  getEvents,
  deleteEvent,
};

export default eventService;
