import axios from "../../components/chat/axios";

// const API_URL = "http://localhost:5000/api/";
const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";

// Create new event
const createGallery = async (galleryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
     "api/gallery/add",
    galleryData,
    config
  );

  return response.data;
};

// Get galleries
const getGalleries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("api/gallery", config);
  return response.data;
};

// Delete gallery
const deleteGallery = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("api/gallery/" + data, config);

  return response.data;
};
const galleryService = {
  createGallery,
  getGalleries,
  deleteGallery,
};

export default galleryService;
