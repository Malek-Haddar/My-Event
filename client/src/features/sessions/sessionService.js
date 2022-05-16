import axios from "axios";

const API_URL = "http://localhost:5000/api/user/";
const API_URL_SESSION = "http://localhost:5000/api/";

// Create new session
const createSession = async (sessionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    API_URL_SESSION + "session/add",
    sessionData,
    config
  );

  return response.data;
};

// Get sessions
const getSessions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL_SESSION + "session", config);
  return response.data;
};

const getUserSession = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "session", config);
  return response.data;
};

// affect session to event
const affectSessionToEvent = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    idSession: data.idSession,
    idEvent: data.idEvent,
  };
  const response = await axios.patch(
    API_URL_SESSION + "session/sessions/affect",
    body,
    config
  );
  console.log("data: ", response);

  return response.data;
};
// delete session

// Delete user goal
const deleteSession = async (token, sessionId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL_SESSION + "session/delete/" + sessionId,
    config
  );

  return response.data;
};

// const deleteSession = async (token, data) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   const body = {
//     sessionId: data.sessionId,
//   };

//   const response = await axios.delete(
//     API_URL_SESSION + "session/delete",
//     body,
//     config
//   );
//   console.log("here" + sessionId);
//   // console.log("data: ", response);

//   return response.data;
// };
// affect session to category
const affectSessionToCategory = async (token, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    idSession: data.idSession,
    idCategory: data.idCategory,
  };
  const response = await axios.patch(
    API_URL_SESSION + "session/sessions/category/affect",
    body,
    config
  );
  console.log("data: ", response);

  return response.data;
};
// like session
const likeSession = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // const id = {
  //   idSession: data.idSession,
  //   idCategory: data.idCategory,
  // };

  const response = await axios.patch(
    API_URL_SESSION + "session/like/" + id,
    config
  );
  console.log("data: ", response);

  return response.data;
};

const sessionService = {
  createSession,
  getSessions,
  getUserSession,
  affectSessionToEvent,
  affectSessionToCategory,
  deleteSession,
  likeSession,
};

export default sessionService;
