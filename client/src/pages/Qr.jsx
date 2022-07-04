import React, { Component, useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getSessions, reset } from "../features/sessions/sessionSlice";
import { checkIn } from "../features/users/userSlice";

const Qr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState("");
  const [state, setState] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { sessions, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user || user.result.role !== 1) {
    //   navigate("/");
    // }

    dispatch(getSessions());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // let state = {
  //   result: "No result",
  // };

  const handleScan = (data) => {
    if (data) {
      setState({
        result: data,
      });
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  const checkInSession = () => {
    const userData = {
      idUser: state.result,
      idSession: sessionId,
    };
    dispatch(checkIn(userData));
  };

  return (
    <>
      <Header />
      <section className="page-header bg_img padding-tb pb-16 rounded">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">QR Code Scanner</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a className="active">QR</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="d-flex flex-column justify-content-center align-items-center my-16">
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: "50%" }}
          />{" "}
        </div>
        <div className="md:flex justify-center">
          <div className="md:flex mx-auto items-center justify-center mb-16 w-1/2">
            <div className="mr-8">
              <p>{state.result}</p>
            </div>
            <div>
              <select
                className="text-primary border-1 rounded-md ml-3"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessions.map((session) => (
                  <option key={session._id} value={session._id}>
                    {session.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="ml-9 py-4">
              <a
                className="lab-btn bg-white"
                type="submit"
                onClick={() => {
                  checkInSession();
                }}
              >
                ChekIn
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Qr;
