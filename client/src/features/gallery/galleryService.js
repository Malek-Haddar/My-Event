import axios from "axios";

const API_URL = "api/";

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

// Get events
const getGalleries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "gallery", config);
  return response.data;
};

const eventService = {
  createGallery,
  getGalleries,
};

export default eventService;
