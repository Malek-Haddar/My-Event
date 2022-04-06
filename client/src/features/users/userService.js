import axios from "axios";

const API_URL = "api/user/";
const API_URL_check = "api/check/checkIn/";

// Create new user
const checkIn = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL_check + userData.idUser + "/" + userData.idSession,
    config
  );

  return response.data;
};

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "users", config);
  return response.data;
};

const UserService = {
  checkIn,
  getUsers,
};

export default UserService;
