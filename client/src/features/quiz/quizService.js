import axios from "axios";

const API_URL = "http://localhost:5000/api/";

// Create new quiz
const createQuiz = async (quizData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + "quiz/add", quizData, config);

  return response.data;
};

// Get quizzes
const getQuizzes = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "quiz", config);
  return response.data;
};

const quizService = {
  createQuiz,
  getQuizzes,
};

export default quizService;
