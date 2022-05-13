import axios from "axios";

const API_URL = "http://localhost:5000/api/";

// Create new event
const createGallery = async (galleryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "gallery/add",
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

  const response = await axios.get(API_URL + "gallery", config);
  return response.data;
};

const galleryService = {
  createGallery,
  getGalleries,
};

export default galleryService;
