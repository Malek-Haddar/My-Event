import axios from "axios";

const API_URL = "http://localhost:5000/api/";
const API_URL_SESSION = "http://localhost:5000/api/session/";

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

// affect quiz to session
const affectQuizToSession = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    idQuiz: data.idQuiz,
    idSession: data.idSession,
  };
  const response = await axios.patch(API_URL_SESSION + "quiz/affect", body, config);
  console.log("data: ", response);

  return response.data;
};
const quizService = {
  createQuiz,
  getQuizzes,
  affectQuizToSession,
};

export default quizService;
