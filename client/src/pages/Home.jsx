import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <section className="banner-section">
        <div className="container">
          <div className="banner-wrapper shape-a">
            <div className="row gy-5 align-items-center">
              <div className="col-lg-6 col-12">
                <div className="banner-content">
                  <ul
                    id="countdown"
                    className="countdown count-down"
                    data-date="June 31, 2021 21:14:01"
                  >
                    <li className="clock-item">
                      <span className="count-number days">56</span>
                      <p className="count-text">Days</p>
                    </li>

                    <li className="clock-item">
                      <span className="count-number hours">16</span>
                      <p className="count-text">Hour</p>
                    </li>

                    <li className="clock-item">
                      <span className="count-number minutes">25</span>
                      <p className="count-text">Min</p>
                    </li>

                    <li className="clock-item">
                      <span className="count-number seconds">19</span>
                      <p className="count-text">Sec</p>
                    </li>
                  </ul>
                  <h1>Digital World Meetup 2021</h1>
                  <p>
                    Join Our International Family Today! Please Call us For More
                    info.
                  </p>
                  {user ? (
                    <Link to="/" className="lab-btn">
                      <span>Join Now</span>{" "}
                    </Link>
                  ) : (
                    <Link to="/register" className="lab-btn">
                      <span>Register Now</span>{" "}
                    </Link>
                  )}
                  <div className="event-sponsored">
                    <p>Event Sponsored By:</p>
                    <img
                      src={require("../assets/images/banner/02.png")}
                      alt="sponsor"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-12">
                <div className="banner-image">
                  <img
                    src={require("../assets/images/banner/01.png")}
                    alt="banner-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
