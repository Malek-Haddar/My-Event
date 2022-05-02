import axios from "axios";

const API_URL = "http://localhost:5000/api/";

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "event/add", eventData, config);

  return response.data;
};

// Get events
const getEvents = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "event", config);
  return response.data;
};

const eventService = {
  createEvent,
  getEvents,
};

export default eventService;
