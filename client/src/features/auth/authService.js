import axios from "../../components/chat/axios";

// const API_URL = "http://localhost:5000/api/";
// const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";
// const API_URL = "https://events.i-techrity.tn/backendEvents/api/";

// Register user
const register = async (userData) => {
  const response = await axios.post("api/user/signup", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// login user
const login = async (userData) => {
  const response = await axios.post("api/user/signin", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

//Logout user
const logout = () => {
  localStorage.removeItem("user");
};

// affect category to Attendee
const affectCategoryToAttendee = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    idCategory: data.idCategory,
    idUser: data.idUser,
  };
  const response = await axios.patch("api/user/users/affect", body, config);
  console.log("data: ", response);

  return response.data;
};
// updateProfile
const updateProfile = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch("api/user/profile", data, config);
  // const response = await axios.get("api/user/details", config);
  if (response.data) {
    // localStorage.setItem("user", JSON.stringify({ ...response.data.result }));
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     ...response.data.result,
    //     lastUpdated: Date.now(),
    //   })
    // );
  }

  return response.data;
};
// updateProfile
const UtilisateurDetails = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get("api/user/details", config);
  return response.data;
};
// updateProfile
const getDetailsById = async (data) => {
  // const body = {
  //   id: id,
  // };
  const response = await axios.get("api/user/qr-details/" + data);
  console.log("here" + response.data);
  return response.data;
};
// resetPassword
const resetPassword = async (userData) => {
  const response = await axios.post("api/user/reset", userData);

 
  return response.data;
};
const resetSubmission = async (data) => {

  // headers: { Authorization: `Bearer ${token}
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };
  // const token = props.match.params.token
  console.log({data});
  const response = await axios.post("/api/user/reset-password",{password:data.password},{ params: {
    token:data.token
  }});

  return response.data;
};
const authService = {
  register,
  logout,
  login,
  affectCategoryToAttendee,
  updateProfile,
  UtilisateurDetails,
  getDetailsById,
  resetPassword,
  resetSubmission
};

export default authService;
