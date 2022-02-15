import axios from "axios";


const API_URL = 'http://localhost:5000/user/'

// Register user
const register = async (userData) => {
    const response = await axios.post(API_URL + 'signup', userData)


if (response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
}
return response.data
}


// login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'signin', userData)


if (response.data){
    localStorage.setItem('user', JSON.stringify(response.data))
}
return response.data
}


//Logout user
const logout = ()=> {
    localStorage.removeItem('user')
}



const authService = {
    register, logout, login
}


export default authService