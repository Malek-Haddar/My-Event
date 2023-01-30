import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const instance = axios.create({
  baseURL: "https://poised-smock-ray.cyclic.app/",
  // baseURL: "http://localhost:5000/",
  // baseURL: REACT_APP_BASE_URL,
});

export default instance;
