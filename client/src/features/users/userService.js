import axios from "../../components/chat/axios";

const API_URL = "https://scouts-tunisienne.herokuapp.com/api/user/";

// const API_URL_check = "http://localhost:5000/api/check/checkIn/";
const API_URL_check =
  "https://scouts-tunisienne.herokuapp.com/api/check/checkIn/";

// Create new user
const checkIn = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const body = {
    // email: userData.email,
    idUser: userData.idUser,

    idSession: userData.idSession,
  };

  const response = await axios.patch("api/user/check", body, config);

  return response.data;
};

// Get users
const getUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("api/user/users", config);
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
  const response = await axios.patch("api/user/role/" + id, body, config);

  return response.data;
};

// Delete customer
const deleteCustomer = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("api/user/delete/" + data, config);

  return response.data;
};

const UserService = {
  checkIn,
  getUsers,
  changeRole,
  deleteCustomer,
};

export default UserService;
