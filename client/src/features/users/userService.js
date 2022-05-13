import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";
const API_URL_check = "http://localhost:5000/api/check/checkIn/";

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

// update user role to organizer
const changeRole = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    role: data.role,
  };
  const id = data.userId;
  const response = await axios.patch(API_URL + "/role/" + id, body, config);

  return response.data;
};

const UserService = {
  checkIn,
  getUsers,
  changeRole,
};

export default UserService;
