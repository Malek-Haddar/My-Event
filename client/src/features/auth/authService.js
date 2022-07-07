import axios from "axios";


// const API_URL = "http://localhost:5000/api/";
const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";
// const API_URL = "https://events.i-techrity.tn/backendEvents/api/";



// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'user/signup', userData)


if (response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
}
return response.data
}


// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'user/signin', userData)


if (response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
}
return response.data
}


//Logout user
const logout = ()=> {
    localStorage.removeItem('user')
}

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
  const response = await axios.patch(
    API_URL + "user/users/affect",
    body,
    config
  );
  console.log("data: ", response);

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  affectCategoryToAttendee
};

export default authService;