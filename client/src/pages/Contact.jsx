import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import {
  getContacts,
  createContact,
  reset,
} from "../features/contacts/contactSlice";

function Contact() {
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
            <h4 className="ph-title">Contact us via mail</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a className="active">Contact us</a>
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
        <div className="contact-top padding-tb aside-bg padding-b">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <article className="contact-form-wrapper">
                  <div className="contact-form">
                    <h4>Don't Be A Stranger Just Say Hello.</h4>
                    <p className="mb-5">
                      {" "}
                      We do fast phone repair. In most to repair your device in
                      just minutes, li we’ll normally get con nection inutes,
                      we’ll normally ge.
                    </p>
                    <form
                      onSubmit={onSubmit}
                      id="commentform"
                      className="comment-form"
                    >
                      <input
                        type="email"
                        name="email"
                        className=""
                        placeholder="Email*"
                        id="email"
                        value={email}
                        onChange={onChange}
                      />

                      <input
                        className=""
                        placeholder="Subject*"
                        type="text"
                        id="subject"
                        name="subject"
                        value={subject}
                        onChange={onChange}
                      />
                      <textarea
                        cols="30"
                        rows="9"
                        placeholder="Message*"
                        type="textarea"
                        id="messages"
                        name="messages"
                        value={messages}
                        onChange={onChange}
                      ></textarea>
                      <button type="submit" className="lab-btn">
                        <span>Send Our Message</span>
                      </button>
                    </form>
                  </div>
                </article>
              </div>
              <div className="col-lg-4">
                <div className="contact-info-wrapper">
                  <div className="contact-info-title">
                    <h5>Get Information</h5>
                    <p>
                      Our Contact information Details and Follow us on social
                      media
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
                          <span className="fw-bold">Office Address</span>
                          <p>1201 park street, Fifth Avenue</p>
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
                          <p>+22698 745 632,02 982 745</p>
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
                          <span className="fw-bold">Send Mail</span>
                          <p>adminKagont@gmil.com</p>
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
                          <span className="fw-bold">Our Website</span>
                          <p>www.Kagont-event.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-bottom">
          <div className="contac-bottom">
            <div className="row justify-content-center g-0">
              <div className="col-12">
                <div className="location-map">
                  <div id="map">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.227736753981!2d90.38698831452395!3d23.739256984594892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85c740f17d1%3A0xdd3daab8c90eb11f!2sCodexCoder!5e0!3m2!1sbn!2sbd!4v1610134370994!5m2!1sbn!2sbd"
                      allowfullscreen=""
                    ></iframe>
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
