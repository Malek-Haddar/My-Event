import axios from "axios";

// const API_URL = "http://localhost:5000/reclamation/";
const API_URL = "api/";


// Create new Contact
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "reclamation/add", contactData, config);

  return response.data;
};

// Get Contacts
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL+ "reclamation", config);
  return response.data;
};

const contactService = {
  createContact,
  getContacts,
};

export default contactService;
