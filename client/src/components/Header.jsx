/* eslint-disable react/jsx-no-undef */
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { SiPingdom, SiStatuspal } from "react-icons/si";
import Notification from "./Notification";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <>
      <section>
        <header className="header-section">
          <div className="header-bottom">
            <div className="container">
              <div className="header-wrapper">
                <div className="logo flex">
                  <a href="/" className="text-5xl ">
                    {/* <img src="assets/images/logo/01.png" alt="logo" /> */}
                    <SiPingdom />
                  </a>{" "}
                </div>

                {user ? (
                  <div className="menu-area">
                    <ul className="menu">
                      {user && user.result.role === 0 && (
                        <>
                          <li>
                            <a href="/" className="hover:text-pink-600">
                              Home
                            </a>
                          </li>
                          <li>
                            <a href="/gallery" className="hover:text-pink-600">
                              Gallery
                            </a>
                          </li>{" "}
                          <li>
                            <a href="/calendar" className="hover:text-pink-600">
                              Calendar
                            </a>
                          </li>{" "}
                          {/* <li>
                            <a href="/room">Rooms</a>
                          </li>{" "} */}
                          <li>
                            <a href="/quiz" className="hover:text-pink-600">
                              Quiz
                            </a>
                          </li>{" "}
                          <li>
                            <a href="/contact" className="hover:text-pink-600">
                              Contact
                            </a>
                          </li>
                          {/* <div className="cart-ticket hidden md:block ">
                            <Notification />
                          </div> */}
                        </>
                      )}

                      {user && user.result.role === 3 && (
                        <>
                          <li>
                            <a href="/" className="hover:text-pink-600">
                              Home
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
                              Dashboard
                            </a>
                          </li>
                        </>
                      )}
                      {user && user.result.role === 1 && (
                        <>
                          <li>
                            <a href="/qr" className="hover:text-pink-600">
                              CheckIn
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
                          Home
                        </a>
                      </li>
                      <Link to="/login" className=" ticket-btn lab-btn  ">
                        <span className="hover:text-pink-600"> Login</span>
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
