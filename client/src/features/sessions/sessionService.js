import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";
const API_URL_SESSION = "http://localhost:5000/api/";

// Create new session
const createSession = async (sessionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL_SESSION + "session/add",
    sessionData,
    config
  );

  return response.data;
};

// Get sessions
const getSessions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL_SESSION + "session", config);
  return response.data;
};

const getUserSession = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "session", config);
  return response.data;
};

const sessionService = {
  createSession,
  getSessions,
  getUserSession,
};

export default sessionService;
