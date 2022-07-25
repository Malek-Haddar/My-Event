import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getSessionsbyDate } from "../features/sessions/sessionSlice";
import { checkIn } from "../features/users/userSlice";

const Qr = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState("");
  const [state, setState] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { sessionsbyDate } = useSelector((state) => state.sessionsbyDate);

  const { users, isSuccess } = useSelector((state) => state.users);

  useEffect(() => {
    // if (isError) {
    //   console.log(message);
    // }

    if (user && user.result.role === 0) {
      navigate("/");
    }
    dispatch(getSessionsbyDate());
  }, [user, navigate, , dispatch]);
  console.log({ sessionsbyDate });
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
    // const mail = state.result;

    // const login = mail.substring(7);

    // console.log({ login });

    const userData = {
      email: state.result.substring(7),
      idSession: sessionId,
    };
    dispatch(checkIn(userData));
    if (isSuccess || users) {
      toast("User Checked ✅");
    }
  };
  const today = new Date();
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
        <div className="flex items-center justify-center">
          <p>{state.result}</p>
        </div>
        <div className="md:flex justify-center">
          <div className="md:flex items-center justify-center md:mb-8 md:w-2/3 space-y-3  space-x-2 text-center">
            <div className="text-center ">
              <span>24/07</span>
              <select
                className="text-primary border-1 rounded-md ml-3 w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[0]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="text-center ">
              <span>25/07</span>

              <select
                className="text-primary border-1 rounded-md ml-3 w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[1]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="text-center ">
              <span>26/07</span>

              <select
                className="text-primary border-1 rounded-md ml-3 w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[2]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="text-center ">
              <span>27/07</span>

              <select
                className="text-primary border-1 rounded-md ml-3  w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[2]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="text-center ">
              <span>28/07</span>

              <select
                className="text-primary border-1 rounded-md ml-3 w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[2]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            <div className="text-center ">
              <span>29/07</span>

              <select
                className="text-primary border-1 rounded-md ml-3 w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[2]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex item-center justify-center my-3">
          <a
            className="lab-btn bg-white mb-8"
            type="submit"
            onClick={() => {
              checkInSession();
            }}
          >
            ChekIn
          </a>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Qr;
