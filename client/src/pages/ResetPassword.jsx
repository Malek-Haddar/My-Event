import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { reset, resetSubmission } from "../features/auth/authSlice";

function ResetPassword(props, params) {
  const { t } = useTranslation();

  let { token } = useParams();

  const [password, setPassword] = useState("");

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
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      token,
      password,
    };
    dispatch(resetSubmission(data));
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
            <h4 className="ph-title">{t("Reset Now")}</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">{t("Home")}</a>
              </li>

              <li>
                <a className="active">{t("Reset")}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="login-section padding-tb">
        <div className=" container">
          <div className="account-wrapper">
            <h3 className="title">{t("Reset")}</h3>

            <form className="account-form" onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="password"
                  placeholder={t("password")}
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  minLength={6}
                  required
                />
              </div>

              {/* <div className="form-group">
                <div className="d-flex justify-content-between flex-wrap pt-sm-2">
                  <div className="checkgroup">
                    <input type="checkbox" name="remember" id="remember" />
                    <label htmlFor="remember">Remember Me</label>
                  </div>
                  <a href="#">Forget Password?</a>
                </div>
              </div> */}
              <div className="form-group">
                <button type="submit" className="d-block lab-btn bg-white">
                  <span>{t("Confirm")}</span>
                </button>
              </div>
            </form>
            {/* <div className="account-bottom">
              <span className="or mt-5">
                <span>or</span>
              </span>
              <span className="d-block cate ">
                Don’t Have any Account? <a href="/register"> Sign Up</a>
              </span>
            </div> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ResetPassword;
