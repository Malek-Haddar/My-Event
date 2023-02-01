import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { useTranslation, initReactI18next } from "react-i18next";

import {
  getContacts,
  createContact,
  reset,
} from "../features/contacts/contactSlice";

function Contact() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    messages: "",
  });

  const { email, subject, messages } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { contacts, isLoading, isError, message } = useSelector(
    (state) => state.contacts
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getContacts());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(contacts);

  const onChange = (e) => {
    setFormData((prevSate) => ({
      ...prevSate,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const contactData = {
      email,
      subject,
      messages,
    };
    dispatch(createContact(contactData));
    setFormData("");
    toast(" Message sent successfully 👏");
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <>
      <Header />
      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">{t('Contact us via mail')}</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">{t('Home')}</a>
              </li>
              <li>
                <a className="active">{t('Contact Us')}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* <section className="contact">
        {contacts.length > 0 ? (
          <div className="card">
            {contacts.map((c) => (
              <div class="text-primary">{c.subject}</div>
            ))}
          </div>
        ) : (
          <h3>You have not set any contacts</h3>
        )}
      </section> */}
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
                        type="email"
                        name="email"
                        className=""
                        placeholder={t('email')}
                        id="email"
                        value={email}
                        onChange={onChange}
                      />

                      <input
                        className=""
                        placeholder={t('Subject')}
                        type="text"
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={onChange}
                      />
                      <textarea
                        cols="30"
                        rows="9"
                        placeholder={t('message')}
                        type="textarea"
                        id="messages"
                        name="messages"
                        value={messages}
                        onChange={onChange}
                      ></textarea>
                      <button type="submit" className="lab-btn">
                        <span>{t('Send Our Message')}</span>
                      </button>
                    </form>
                  </div>
                </article>
              </div>

              <div className="col-lg-4">
                <div className="contact-info-wrapper ">
                  <div className="contact-info-title">
                    <h5>{t('Get Information')}</h5>
                    <p>
                      {t('Our Contact information')}
                      
                    </p>
                  </div>
                  <div className="contact-info-content">
                    <div className="contact-info-item">
                      <div className="contact-info-inner">
                        <div className="contact-info-thumb">
                          <img
                            src="assets/images/contact/01.png"
                            alt="address"
                          />
                        </div>
                        <div className="contact-info-details">
                          <span className="fw-bold">{t('Office Address')}</span>
                          <p>
                            {t('Address')}
                          </p>
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
                          <span className="fw-bold">{t('Phone Number')}</span>
                          <p>+216 70 867 014</p>
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
                          <span className="fw-bold">{t('email')}</span>
                          <p>contact@iwatch.tn</p>
                        </div>
                      </div>
                    </div>
                    <div className="contact-info-item">
                      <div className="contact-info-inner">
                        <div className="contact-info-thumb">
                          <img
                            src="assets/images/contact/04.png"
                            alt="address"
                          />
                        </div>
                        <div className="contact-info-details">
                          <span className="fw-bold">{t('our website')}</span>
                          <p>https://www.iwatch.tn/ar/</p>
                        </div>
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

export default Contact;
