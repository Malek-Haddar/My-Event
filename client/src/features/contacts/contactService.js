import axios from "../../components/chat/axios";

// const API_URL = "http://localhost:5000/reclamation/";
// const API_URL = "http://localhost:5000/api/";

// const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";

// Create new Contact
const createContact = async (contactData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    "api/reclamation/add",
    contactData,
    config
  );

  return response.data;
};

// Get Contacts
const getContacts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get( "api/reclamation", config);
  return response.data;
};

const contactService = {
  createContact,
  getContacts,
};

export default contactService;
