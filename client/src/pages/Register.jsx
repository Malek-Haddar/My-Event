import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { register, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

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
      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">Registration Page</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">Home</a>
              </li>

              <li>
                <a className="active">Registration</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="login-section padding-tb">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">Register Now</h3>
            <form className="account-form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  placeholder="Email"
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control"
                  id="password2"
                  name="password2"
                  value={password2}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <button className="d-block lab-btn">
                  <span>Get Started Now</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Are you a member? <a href="/login">Login</a>
              </span>
              <span className="or">
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
              </ul>
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

export default Register