import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import { signIn } from "../features/usersSlice";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation, initReactI18next } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
    // dispatch(signIn());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Header />
      <section className="page-header padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">{t('Login for event')}</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">{t('Home')}</a>
              </li>

              <li>
                <a className="active">{t('Login')}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="login-section padding-tb">
        <div className=" container">
          <div className="account-wrapper">
            <h3 className="title">{t('Login')}</h3>

            <form className="account-form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder={t('email')}
                  id="email"
                  name="email"
                  value={email}
                  onChange={onChange}
                  minLength={9}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t('password')}
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  minLength={6}
                  required
                />
              </div>
              <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">{t('remember me')}</label>
                  </div>
                  <a href="/reset">{t('Forgot Password')}</a>
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="d-block lab-btn bg-white">
                  <span>{t('submit now')}</span>
                </button>
              </div>
            </form>
            <div className="account-bottom">
              <span className="or mt-5">
                <span>{t('or')}</span>
              </span>
              <span className="d-block cate ">
              {t('Don’t Have any Account')} <a href="/register"> {t('Sign Up')}</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* <section classNameName="heading">
      <h1>
        <FaSignInAlt/> Login
      </h1>
      <p> Login to your account </p>
    </section>
    <section classNameName="form">
      <form onSubmit={onSubmit} >

        <div classNameName="form-group">
        <input type="email" 
        classNameName="form-control" 
        id="email" name="email" value={email}
        placeholder='Enter your email' onChange={onChange} />
        </div>

        <div classNameName="form-group">
        <input type="password" 
        classNameName="form-control" 
        id="password" name="password" value={password}
        placeholder='Enter your password' onChange={onChange} />
        </div>

        <div classNameName="form-groupe">
          <button type="submit" classNameName="btn btn-block">Submit</button>
        </div>
      </form>
    </section> */}
      <Footer />
    </>
  );
}

export default Login