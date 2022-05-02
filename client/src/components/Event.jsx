import React, { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getEvents, reset } from "../features/events/eventSlice";
import Spinner from "./Spinner";

function Event() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getEvents());
    console.log(events);
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(events);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-wrapper shape-a">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 col-12">
              {/* {events.map((event) => ( */}
              <div className="banner-content">
                <ul
                  id="countdown"
                  className="countdown count-down"
                  data-date={events[0]?.date}
                >
                  <li className="clock-item">
                    <span className="count-number days px-1"></span>
                    <p className="count-text">Days</p>
                  </li>

                  <li className="clock-item">
                    <span className="count-number hours"></span>
                    <p className="count-text">Hour</p>
                  </li>

                  <li className="clock-item">
                    <span className="count-number minutes"></span>
                    <p className="count-text">Min</p>
                  </li>

                  <li className="clock-item">
                    <span className="count-number seconds"></span>
                    <p className="count-text">Sec</p>
                  </li>
                </ul>
                <h1> {events[0]?.name} </h1>
                <p>
                  {events[0]?.description} <br />{" "}
                  <h5>
                    <FaMapMarkerAlt />
                    {events[0]?.location}
                  </h5>
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
              {/* ))} */}
            </div>
            <div className="col-lg-6 col-12">
              <div className="banner-image">
                <img
                  src={require("../assets/images/banner/011.png")}
                  alt="banner-img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Event;
