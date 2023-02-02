/* eslint-disable react/jsx-no-undef */
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout, reset } from "../features/auth/authSlice";
import Notification from "./Notification";

import { useEffect } from "react";

function Header() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentLang = localStorage.getItem("I18N_LANGUAGE");
  if (currentLang == "en") {
    document.body.dir = "ltr";
  } else {
    document.body.dir = "rtl";
  }

  const lngs = [
    { code: "en", nativeName: "English" },
    { code: "ar", nativeName: "Arabic" },
  ];
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  useEffect(() => {
    localStorage.getItem("I18N_LANGUAGE");
  }, []);

  const onChange = (e) => {
    localStorage.setItem("I18N_LANGUAGE", e);
    let lang = localStorage.getItem("I18N_LANGUAGE");
    if (lang == "en") {
      document.body.dir = "ltr";
      i18n.changeLanguage(lang);
      // document.location.reload();
    } else {
      document.body.dir = "rtl";
      i18n.changeLanguage(lang);
      // document.location.reload();
    }
  };

  return (
    <>
      <section>
        <header className="header-section">
          <div className="header-bottom">
            <div className="container">
              <div className="header-wrapper">
                <div className="logo flex">
                  <a href="/" className="text-5xl w-44 h-16 ">
                    <img
                      src="assets/images/logo/mac2023-02.png"
                      className="rounded-none"
                      alt="logo"
                    />
                    {/* <SiPingdom /> */}
                  </a>{" "}
                  {currentLang === "ar" ? (
                    <a
                      onClick={() => onChange("en")}
                      className="md:my-auto mx-2 "
                    >
                      <span className="hover:text-pink-600">
                        <i class="icofont-globe text-4xl w-full"></i>
                      </span>
                    </a>
                  ) : (
                    <a
                      onClick={() => onChange("ar")}
                      className="md:my-auto mx-2"
                    >
                      <span className="hover:text-pink-600">
                        <i class="icofont-globe text-4xl w-full"></i>
                      </span>
                    </a>
                  )}
                </div>

                {/* <select
                  class="p-1 text-dark rounded bg-transparent"
                  onChange={onChange}
                  // style={{ color: "#df01ae" }}
                >
                  <option
                    value="ar"
                    selected={currentLang == "ar" ? true : false}
                  >
                    العربية
                  </option>
                  <option
                    value="en"
                    selected={currentLang == "en" ? true : false}
                  >
                    English
                  </option>
                </select> */}

                {user ? (
                  <div className="menu-area">
                    <ul className="menu">
                      {user && user?.result?.role === 0 && (
                        <>
                          <li>
                            <a href="/" className="hover:text-pink-600">
                              {t("Login")}
                            </a>
                          </li>
                          <li>
                            <a href="/gallery" className="hover:text-pink-600">
                              {t("Gallery")}
                            </a>
                          </li>{" "}
                          <li>
                            <a href="/calendar" className="hover:text-pink-600">
                              {t("Calendar")}
                            </a>
                          </li>{" "}
                          {/* <li>
                            <a href="/room">Rooms</a>
                          </li>{" "}
                          <li>
                            <a href="/quiz" className="hover:text-pink-600">
                              Quiz
                            </a>
                          </li>{" "} */}
                          <li>
                            <a href="/profile" className="hover:text-pink-600">
                              {t("Profile")}
                            </a>
                          </li>{" "}
                          <li>
                            <a href="/contact" className="hover:text-pink-600">
                              {t("Contact")}
                            </a>
                          </li>
                          {/* <div className="cart-ticket hidden md:block ">
                            <Notification />
                          </div> */}
                        </>
                      )}

                      {user && user.result.role === 2 && (
                        <>
                          <li>
                            <a href="/" className="hover:text-pink-600">
                              {t("Home")}
                            </a>
                          </li>
                          {/* <li>
                            <a href="/room">Rooms</a>
                          </li>{" "} */}
                          <li>
                            <a
                              href="/dashboard"
                              className="hover:text-pink-600"
                            >
                              {t("Dashboard")}
                            </a>
                          </li>
                        </>
                      )}
                      {user && user.result.role === 1 && (
                        <>
                          <li>
                            <a href="/qr" className="hover:text-pink-600">
                              {t("CheckIn")}
                            </a>
                          </li>
                          {/* <li>
                            <a href="/room">Rooms</a>
                          </li>{" "} */}
                        </>
                      )}
                      <li className="hidden md:flex items-center">
                        <div className="cart-ticket ">
                          <Notification />
                        </div>
                      </li>
                      <li>
                        <a onClick={onLogout} type="submit">
                          <span className="hover:text-pink-600">
                            <i class="icofont-power text-xl w-full"></i>
                          </span>
                        </a>
                      </li>
                    </ul>
                    <li className="flex md:hidden items-center">
                      <div className=" cart-ticket ">
                        <Notification />
                      </div>
                    </li>
                    <div className="header-bar d-lg-none">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                ) : (
                  <div className="menu-area">
                    <ul className="menu">
                      <li>
                        <a href="/" className="hover:text-pink-600">
                          {t("Home")}
                        </a>
                      </li>
                      <Link to="/login" className=" ticket-btn lab-btn  ">
                        <span className="hover:text-pink-600">
                          {" "}
                          {t("Login")}
                        </span>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <a href="#" className="scrollToTop">
          <i className="icofont-bubble-up"></i>
          <span className="pluse_1"></span>
          <span className="pluse_2"></span>
        </a>
      </section>
    </>
  );
}

export default Header;
