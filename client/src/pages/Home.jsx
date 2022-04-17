import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Event from "../components/Event";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Session from "../components/Session";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <><Header />
      <Event />
      <Session />
      <Footer />
    </>
  );
}

export default Home;
