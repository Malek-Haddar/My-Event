import axios from "../components/chat/axios";

import React, { useEffect, useState } from "react";
import QrReader from "react-qr-reader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getDetailsById } from "../features/auth/authSlice";
import { getSessionsbyDate } from "../features/sessions/sessionSlice";
import { checkIn } from "../features/users/userSlice";
import { useTranslation, initReactI18next } from "react-i18next";


const Qr = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sessionId, setSessionId] = useState("");
  const [state, setState] = useState("");
  const { user, details } = useSelector((state) => state.auth);
  const { sessionsbyDate } = useSelector((state) => state.sessionsbyDate);

  const { users, isSuccess, isError, isLoading, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    // if (isError) {
    //   toast(message);
    // }

    if (user && user.result === 0) {
      navigate("/");
    }
    dispatch(getSessionsbyDate());
    if (user && state) {
      const data = {
        id: state.result,
      };
      dispatch(getDetailsById(data));
    }
  }, [user, navigate, state, dispatch]);

  // const getDetailsById = async () => {
  //   const id = "63d591ebaeefb360ff0ed9ac";

  //   const response = await axios.get("api/user/qr-details/" + id);
  //   return response.data;
  // };

  // let state = {
  //   result: "No result",
  // };

  useEffect(() => {
    if (isSuccess) {
      toast("User Checked ✅");
    } else if (isError) {
      toast(message);
    }
  }, [isSuccess, isError]);

  // const checkInSession = () => {
  //   const userData = {
  //     idUser: state.result,
  //     idSession: sessionId,
  //   };
  //   dispatch(checkIn(userData));
  //   // if (isSuccess) {
  //   //   toast("User Checked ✅");
  //   // } else if (isError) {
  //   //   toast("something went wrong");
  //   // }
  // };

  const handleScan = (data) => {
    if (data) {
      setState({
        result: data,
      });
      checkInSession();
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
    // if (isSuccess) {
    //   toast("User Checked ✅");
    // } else if (isError) {
    //   toast(message);
    // }
  };
  const today = new Date();
  return (
    <>
      <Header />
      <section className="page-header bg_img padding-tb pb-16 rounded">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">{t('QR Code Scanner')}</h4>
            <ul className="lab-ul">
              <li>
                <a href="/"> {t('Home')}</a>
              </li>
              <li>
                <a className="active"> {t('QR')}</a>
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
        <div className="text-center my-3">
          <p>{state.result}</p>
          <p>{details.email}</p>
        </div>
        <div className="md:flex justify-center">
          <div className="md:flex items-center justify-center md:mb-8 md:w-2/3 space-y-3  space-x-2 text-center">
            <div className="text-center ">
              <span>04/02</span>
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
              <span>05/02</span>

              <select
                className="text-primary border-1 rounded-md ml-3 w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- {t('Select')}  -</option>

                {sessionsbyDate[1]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div>
            {/* <div className="text-center ">
              <span>25/07</span>

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
              <span>26/07</span>

              <select
                className="text-primary border-1 rounded-md ml-3  w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[3]?.result.map((session) => (
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
                className="text-primary border-1 rounded-md ml-3 w-1/2 md:w-full text-center"
                onChange={(e) => setSessionId(e.target.value)}
              >
                <option value="">- Select -</option>

                {sessionsbyDate[4]?.result.map((session) => (
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

                {sessionsbyDate[5]?.result.map((session) => (
                  <>
                    <option key={session._id} value={session._id}>
                      {session.name}
                    </option>
                  </>
                ))}
              </select>
            </div> */}
          </div>
        </div>
        {/* <div className="flex item-center justify-center my-3">
          <a
            className="lab-btn bg-white mb-8"
            type="submit"
            onClick={() => {
              checkInSession();
            }}
          >
            {t('CheckIn')}
          </a>
        </div> */}
        {/* <div className="flex item-center justify-center my-3">
          <a
            className="lab-btn bg-white mb-8"
            type="submit"
            onClick={() => {
              getDetailsById();
            }}
          >
            User Details
          </a>
        </div> */}
      </section>
      <Footer />
    </>
  );
};

export default Qr;
