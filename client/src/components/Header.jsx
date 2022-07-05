/* eslint-disable react/jsx-no-undef */
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { SiPingdom } from "react-icons/si";

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
                            <a href="/">Home</a>
                          </li>
                          <li>
                            <a href="/gallery">Gallery</a>
                          </li>{" "}
                          <li>
                            <a href="/calendar">Calendar</a>
                          </li>{" "}
                          {/* <li>
                            <a href="/room">Rooms</a>
                          </li>{" "} */}
                          <li>
                            <a href="/quiz">Quiz</a>
                          </li>{" "}
                          <li>
                            <a href="/contact">Contact</a>
                          </li>
                        </>
                      )}

                      {user && user.result.role === 3 && (
                        <>
                          <li>
                            <a href="/">Home</a>
                          </li>
                          {/* <li>
                            <a href="/room">Rooms</a>
                          </li>{" "} */}
                          <li>
                            <a href="/dashboard">Dashboard</a>
                          </li>
                        </>
                      )}
                      {user && user.result.role === 1 && (
                        <>
                          <li>
                            <a href="/qr">CheckIn</a>
                          </li>
                          {/* <li>
                            <a href="/room">Rooms</a>
                          </li>{" "} */}
                        </>
                      )}
                    </ul>
                    <div className="cart-ticket">
                      <button
                        onClick={onLogout}
                        className="ticket-btn lab-btn "
                      >
                        <span>Logout</span>
                      </button>
                    </div>

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
                        <a href="/">Home</a>
                      </li>
                      <Link to="/login" className=" ticket-btn lab-btn  ">
                        <span> Login</span>
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
