import React, { useEffect } from "react";
import Sidebar from "../components/chat/Sidebar";
import Chat from "../components/chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice";

function Room() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  return (
    <section className="d-flex">
      <Sidebar />
      <Chat />
    </section>
  );
}

export default Room;
