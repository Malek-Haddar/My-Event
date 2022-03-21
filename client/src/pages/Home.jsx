import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import Session from "../components/Session";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <Event />
      <Session />
    </>
  );
}

export default Home;
