import axios from "axios";

// const API_URL = "http://localhost:5000/api/";
const API_URL = "https://scouts-tunisienne.herokuapp.com/api/";


// Create new Category
const createCategory = async (categoryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL + "category/add",
    categoryData,
    config
  );

  return response.data;
};

// Get Categories
const getCategories = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "category", config);
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
    API_URL + "category/category/affect",
    body,
    config
  );
  console.log("data: ", response);

  return response.data;
};




// Delete  category  Category
const deleteCategory = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + "category/" + data,
    config
  );

  return response.data;
};


const categoryService = {
  createCategory,
  getCategories,
  affectSessionToCategory,
  deleteCategory
};

export default categoryService;
