import axios from "axios";

const API_URL = "http://localhost:5000/reclamation/";

// Create new Contact
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "add", contactData, config);

  return response.data;
};

// Get Contacts
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

const contactService = {
  createContact,
  getContacts,
};

export default contactService;
