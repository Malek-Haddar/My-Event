import React, { useEffect } from "react";
import Sidebar from "../components/chat/Sidebar";
import Chat from "../components/chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { getUserSession, reset } from "../features/sessions/sessionSlice";

function Room() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { userSession, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user || !userSession[0]?.category) {
    //   navigate("/");
    // }

    dispatch(getUserSession());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);
  return (
    <section className="d-flex">
      <Sidebar />
      <Chat />
    </section>
  );
}

export default Room;
