import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Header from "../components/Header";

const ENDPOINT = "http://127.0.0.1:5000"; //endpoint port 5000

const ChatLogin = () => {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log(socket);
    console.log(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <>
      <Header />
      <p>{response}</p>
    </>
  );
};

export default ChatLogin;
