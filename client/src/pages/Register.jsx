import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { register, reset } from "../features/auth/authSlice";

function Register() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    profession: "",
  });

  const { firstName, lastName, email, password, password2, phone, profession } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevSate) => ({
      ...prevSate,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Password do not match!");
    } else {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        phone,
        profession,
      };
      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <section className="page-header bg_img padding">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">{t("Registration")}</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">{t("Home")}</a>
              </li>

              <li>
                <a className="active">{t("Registration")}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="login-section padding-tb">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">{t("Register Now")}</h3>
            <form className="account-form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t("First Name")}
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  minLength={3}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t("First Name")}
                  name="lastName"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                  minLength={3}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  placeholder={t("email")}
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={onChange}
                  minLength={9}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t("password")}
                  name="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={onChange}
                  minLength={6}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t("confirm password")}
                  className="form-control"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                  minLength={6}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder={t("Phone Number")}
                  name="phone"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={onChange}
                  minLength={8}
                  required
                />
              </div>
              {/* <div className="form-group">
                <input
                  type="text"
                  placeholder={t('Profession')}
                  name="profession"
                  className="form-control"
                  id="profession"
                  value={profession}
                  onChange={onChange}
                  minLength={3}
                  required
                />
              </div> */}
              <div className="form-group">
                <select
                  name="profession"
                  className="form-control border-0 rounded-sm text-white"
                  style={{ backgroundColor: "#1A2843" }}
                  id="profession"
                  value={profession}
                  onChange={onChange}
                  required
                >
                  <option value="">-- Select --</option>
                  <option value="volunteer">Volunteer</option>
                  <option value="municipality">Municipality</option>
                  <option value="association">Association</option>
                  <option value="public-institution">Public Institution</option>
                  <option value="activiste">Activist</option>
                  <option value="citizen">Citizen</option>
                  <option value="other">Other</option>
                  ...
                </select>
              </div>

              <div className="form-group">
                <button className="d-block lab-btn">
                  <span>{t("Register Now")}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                {t("Are you a member?")} <a href="/login">{t("Login")}</a>
              </span>
              {/* <span className="or">
                <span>or</span>
              </span>
              <h5 className="subtitle">Register With Social Media</h5>
              <ul className="social-media social-color justify-content-center d-flex lab-ul">
                <li>
                  <a href="#" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="linkedin">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a href="#" className="pinterest">
                    <i className="fab fa-pinterest"></i>
                  </a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
      </div>
      {/* <section classNameName="heading">
      <h1>
        <FaUser/> Register
      </h1>
      <p> Please create an account </p>
    </section>
    <section className="form">
      <form onSubmit={onSubmit} >
        <div className="form-group">
        <input type="text" 
        className="form-control" 
        id="firstName" name="firstName" value={firstName}
        placeholder='Enter your firstName' onChange={onChange} />
        </div>

        <div className="form-group">
        <input type="text" 
        className="form-control" 
        id="lastName" name="lastName" value={lastName}
        placeholder='Enter your lastName' onChange={onChange} />
        </div>

        <div className="form-group">
        <input type="email" 
        className="form-control" 
        id="email" name="email" value={email}
        placeholder='Enter your email' onChange={onChange} />
        </div>

        <div className="form-group">
        <input type="password" 
        className="form-control" 
        id="password" name="password" value={password}
        placeholder='Enter your password' onChange={onChange} />
        </div>

        <div className="form-group">
        <input type="password" 
        className="form-control" 
        id="password2" name="password2" value={password2}
        placeholder='Confirm password' onChange={onChange} />
        </div>

        <div className="form-groupe">
          <button type="submit" className="btn btn-block">Submit</button>
        </div>
      </form>
    </section> */}
      <Footer />
    </>
  );
}

export default Register;
