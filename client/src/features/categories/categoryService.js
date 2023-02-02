import axios from "../../components/chat/axios";

// const API_URL = "http://localhost:5000/api/";
// const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";

// Create new Category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post("api/category/add", categoryData, config);

  return response.data;
};

// Get Categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get("api/category", config);
  return response.data;
};

// affect session to category
const affectSessionToCategory = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    idCategory: data.idCategory,
    idSession: data.idSession,
  };
  const response = await axios.patch(
    "api/category/category/affect",
    body,
    config
  );

  return response.data;
};
const notifyCategory = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    categoryId: data.categoryId,
    notification: data.notification,
  };
  const response = await axios.patch(
    "api/category/category/notification",
    body,
    config
  );

  return response.data;
};

// Delete  category  Category
const deleteCategory = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete("api/category/" + data, config);

  return response.data;
};

const categoryService = {
  createCategory,
  getCategories,
  affectSessionToCategory,
  deleteCategory,
  notifyCategory,
};

export default categoryService;
