/* eslint-disable react/jsx-no-undef */
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

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
        {/* <!-- preloader start here --> */}
        {/* <div className="preloader">
          <div className="preloader-inner">
            <div className="preloader-icon">
              <span></span>
              <span></span>
            </div>
          </div>
        </div> */}
        {/* <!-- preloader ending here --> */}

        {/* <!-- ==========Header Section Starts Here========== --> */}
        <header className="header-section">
          <div className="header-bottom">
            <div className="container">
              <div className="header-wrapper">
                <div className="logo">
                  <a href="/">
                    <img
                      src={require("../assets/images/logo/01.png")}
                      alt="logo"
                    />
                  </a>
                </div>

                {user ? (
                  <div className="menu-area">
                    <ul className="menu">
                      <li>
                        <a href="/">Home</a>
                      </li>

                      <li>
                        <a href="#0">Features</a>
                        <ul className="submenu">
                          <li>
                            <a href="/gallery">Gallery</a>
                          </li>
                          <li>
                            <a href="login.html">Log In</a>
                          </li>
                          <li>
                            <a href="registration.html">Sign Up</a>
                          </li>
                          <li>
                            <a href="pricing-plan.html">Pricing Plan</a>
                          </li>
                          <li>
                            <a href="shop.html">Shop</a>
                          </li>
                          <li>
                            <a href="shop-single.html">Shop Single</a>
                          </li>
                          <li>
                            <a href="cart.html">Cart Page</a>
                          </li>
                          <li>
                            <a href="404.html">404 Page</a>
                          </li>
                          <li>
                            <a href="coming-soon.html">Coming-soon</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#0">Speakers</a>
                        <ul className="submenu">
                          <li>
                            <a href="speakers.html">All Speakers</a>
                          </li>
                          <li>
                            <a href="speaker-details.html">Speaker Details</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="#0">Blog</a>
                        <ul className="submenu">
                          <li>
                            <a href="blog.html">Blog</a>
                          </li>
                          <li>
                            <a href="blog-single.html">Blog Single</a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                    <div className="cart-ticket">
                      {/*  <div className="cart-icon">
                      <a href="#">
                        <i className="icofont-bag"></i>
                        <span>3</span>
                      </a>

                      <div className="cart-content">
                        <ul className="cart-list">
                          <li className="cart-item">
                            <div className="cart-inner">
                              <div className="cart-thumb">
                                <img
                                  src={require("../assets/images/product/menu_cart_01.jpg")}
                                  alt="product"
                                />
                              </div>
                              <div className="cart-details">
                                <h6>
                                  <a href="#">Product Text Here</a>
                                </h6>
                                <p>
                                  Quantity: 1 <span>$56</span>
                                </p>
                                <div className="close-btn">
                                  <a href="#">
                                    <i className="icofont-close"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="cart-item">
                            <div className="cart-inner">
                              <div className="cart-thumb">
                                <img
                                  src={require("../assets/images/product/menu_cart_02.jpg")}
                                  alt="product"
                                />
                              </div>
                              <div className="cart-details">
                                <h6>
                                  <a href="#">Product Text Here</a>
                                </h6>
                                <p>
                                  Quantity: 1 <span>$56</span>
                                </p>
                                <div className="close-btn">
                                  <a href="#">
                                    <i className="icofont-close"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li className="cart-item">
                            <div className="cart-inner">
                              <div className="cart-thumb">
                                <img
                                  src={require("../assets/images/product/menu_cart_03.jpg")}
                                  alt="product"
                                />
                              </div>
                              <div className="cart-details">
                                <h6>
                                  <a href="#">Product Text Here</a>
                                </h6>
                                <p>
                                  Quantity: 1 <span>$56</span>
                                </p>
                                <div className="close-btn">
                                  <a href="#">
                                    <i className="icofont-close"></i>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <a href="#" className="lab-btn">
                          Checkout
                        </a>
                      </div>
                    </div>  */}

                      <button
                        onClick={onLogout}
                        className="ticket-btn lab-btn "
                      >
                        <span> {/* <FaSignOutAlt /> */} Logout</span>
                      </button>
                    </div>

                    {/* <!-- toggle icons --> */}
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
                      <Link to="/login" className="ticket-btn lab-btn ">
                        <span>
                          {" "}
                          <FaSignInAlt /> Login
                        </span>
                      </Link>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        {/* <!-- ==========Header Section Ends Here========== --> */}

        {/* <!-- scrollToTop start here --> */}
        <a href="#" className="scrollToTop">
          <i className="icofont-bubble-up"></i>
          <span className="pluse_1"></span>
          <span className="pluse_2"></span>
        </a>
        {/* <!-- scrollToTop ending here --> */}
      </section>
    </>

    // <header className='header'>

    //   <div className='logo'>
    //     <Link to='/' >BiGEvent</Link>
    //   </div>
    //   <ul>
    //     { user ? (
    //         <li>
    //         <button className='btn' onClick={onLogout}>
    //           /* <FaSignOutAlt /> */ Logout
    //         </button>
    //       </li>
    //     ): (
    //       <>
    //        <li>
    //           <Link to='/login'>
    //               <FaSignInAlt/> Login
    //           </Link>
    //       </li>
    //       <li>
    //           <Link to='/register'>
    //               <FaUser/> Register
    //           </Link>
    //       </li>
    //       </>
    //     ) }

    //   </ul>
    // </header>
  );
}

export default Header;
