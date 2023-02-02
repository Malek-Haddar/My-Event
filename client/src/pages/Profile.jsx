import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { QRCodeSVG } from "qrcode.react";
import QRCode from "react-qr-code";
import { useTranslation, initReactI18next } from "react-i18next";

import Spinner from "../components/Spinner";
import {
  fetchData,
  register,
  reset,
  updateProfile,
  UtilisateurDetails,
} from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const { t } = useTranslation();

  const { user, profile, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    profession: "",
  });
  const { firstName, lastName, phone, profession } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevSate) => ({
      ...prevSate,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !phone || !profession) {
      toast("Complete your profile please !");
      return;
    }
    const userData = {
      ...formData,
    };
    dispatch(updateProfile(userData));

    // navigate("/login");
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Header />
      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">{t('Profile')}</h4>
            <ul className="lab-ul">
              <li>
                <a href="/"> {t('Home')}</a>
              </li>
              <li>
                <a className="active"> {t('Profile')}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="contact-section">
        <div className="contact-top padding-tb  padding-b">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 ">
                <article className="contact-form-wrapper">
                  <div className="contact-form">
                    {/* <h4>Don't Be A Stranger Just Say Hello.</h4> */}
                    {/* <br /> */}
                    <form
                      onSubmit={onSubmit}
                      id="commentform"
                      className="comment-form"
                    >
                      <input
                        type="text"
                        placeholder={!user?.result?.name && "First Name"}
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        defaultValue={
                          user?.result?.name
                            ? user?.result?.name.split(" ").slice(0, -1)
                            : firstName
                        }
                        onChange={onChange}
                        minLength={3}
                        required
                      />
                      <input
                        type="text"
                        placeholder={!user?.result?.name && "Last Name"}
                        name="lastName"
                        className="form-control"
                        id="lastName"
                        defaultValue={
                          user?.result?.name
                            ? user?.result?.name.split(" ").slice(-1)
                            : lastName
                        }
                        onChange={onChange}
                        minLength={3}
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        // placeholder={!user?.result?.email && "Email"}
                        id="email"
                        // defaultValue={
                        //   user?.result?.email ? user?.result?.email : email
                        // }
                        value={user?.result?.email}
                        onChange={onChange}
                        required
                        disabled
                      />

                      <input
                        className="form-control"
                        placeholder={!user?.result?.phone && "Phone"}
                        type="text"
                        id="phone"
                        name="phone"
                        defaultValue={
                          user?.result?.phone ? user?.result?.phone : phone
                        }
                        onChange={onChange}
                        required
                      />
                      <input
                        className="form-control"
                        placeholder={!user?.result?.profession && "Profession"}
                        type="text"
                        id="profession"
                        name="profession"
                        defaultValue={
                          user?.result?.profession
                            ? user?.result?.profession
                            : profession
                        }
                        onChange={onChange}
                        required
                      />
                      {/* <textarea
                        cols="30"
                        rows="9"
                        placeholder="Message*"
                        type="textarea"
                        id="messages"
                        name="messages"
                        // value={messages}
                        // onChange={onChange}
                      ></textarea> */}
                      <button
                        type="submit"
                        className="lab-btn"
                        // onClick={refreshData}
                      >
                        <span> {t('Update Profile')}</span>
                      </button>
                    </form>
                  </div>
                </article>
              </div>

              <div className="col-lg-4">
                <div className="contact-info-wrapper ">
                  {/* <div className="contact-info-title">
                    <h5>Get Information</h5>
                    <p>
                      Our Contact information Details and Follow us on social
                      media
                    </p>
                  </div> */}
                  <div className="contact-info-content">
                    {/* <div className="contact-info-item">
                      <div className="contact-info-inner">
                        <div className="contact-info-thumb">
                          <img
                            src="assets/images/contact/01.png"
                            alt="address"
                          />
                        </div>
                        <div className="contact-info-details">
                          <span className="fw-bold">Office Address</span>
                          <p>Centre International des Scouts Borj Cedria</p>
                        </div>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-info-inner">
                        <div className="contact-info-thumb">
                          <img
                            src="assets/images/contact/02.png"
                            alt="address"
                          />
                        </div>
                        <div className="contact-info-details">
                          <span className="fw-bold">Phone Number</span>
                          <p>+216 98195851</p>
                        </div>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-info-inner">
                        <div className="contact-info-thumb">
                          <img
                            src="assets/images/contact/03.png"
                            alt="address"
                          />
                        </div>
                        <div className="contact-info-details">
                          <span className="fw-bold">Complaint Email</span>
                          <p>arabscoutmoot21@gmail.com</p>
                        </div>
                      </div>
                    </div> */}
                    <div className="contact-info-item flex">
                      <div className="contact-info-inner justify-content-center">
                        <div className="contact-info-thumb">
                          <img
                            src="assets/images/contact/04.png"
                            alt="address"
                          />
                        </div>
                        {user?.result?.name &&
                        user?.result?.phone &&
                        user?.result?.profession ? (
                          <div className="contact-info-details">
                            <span className="fw-bold"> {t('Your Code QR')}</span>
                            <p>
                              {user && (
                                <div
                                  style={{
                                    height: "auto",
                                    margin: "0 auto",
                                    maxWidth: 128,
                                    width: "100%",
                                  }}
                                >
                                  <img
                                    size={256}
                                    style={{
                                      height: "auto",
                                      maxWidth: "100%",
                                      width: "100%",
                                    }}
                                    src={user.qr}
                                  />
                                  {/* <QRCodeSVG value={user.result.id} /> */}
                                </div>
                              )}
                            </p>
                          </div>
                        ) : (
                          <div>
                             {t('Complete Your Profile Please')}<br /> to get your
                            Event Pass
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
