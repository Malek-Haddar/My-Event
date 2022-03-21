import { Temporal } from "@js-temporal/polyfill";
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
  const date2 = Temporal.Now.plainDateTimeISO();

  const today = Temporal.Now.plainDateISO();
  const yesterday = today.subtract({ days: 1 });
  console.log(today.since(yesterday).toString());

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getEvents());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  // console.log(events);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-wrapper shape-a">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 col-12">
              {events.map((event) => (
                <div className="banner-content">
                  <ul
                    id="countdown"
                    className="countdown count-down"
                    data-date="June 31, 2021 21:14:01"
                  >
                    <li className="clock-item">
                      <span className="count-number days">
                        {/* {date2.toString()} */}
                        {Temporal.Now.plainDateISO()
                          .subtract({ days: 10 })
                          .toString()}
                      </span>
                      <p className="count-text">Days</p>
                    </li>

                    <li className="clock-item">
                      <span className="count-number hours">
                        {" "}
                        {new Date(event.date)
                          .getUTCHours()
                          .toLocaleString("en-US")}
                      </span>
                      <p className="count-text">Hour</p>
                    </li>

                    <li className="clock-item">
                      <span className="count-number minutes">
                        {" "}
                        {new Date(event.date)
                          .getUTCMinutes()
                          .toLocaleString("en-US")}
                      </span>
                      <p className="count-text">Min</p>
                    </li>

                    <li className="clock-item">
                      <span className="count-number seconds">
                        {" "}
                        {new Date(event.date)
                          .getUTCSeconds()
                          .toLocaleString("en-US")}
                      </span>
                      <p className="count-text">Sec</p>
                    </li>
                  </ul>
                  <h1> {event.name} </h1>
                  <p>
                    {event.description} <br />{" "}
                    <h5>
                      <FaMapMarkerAlt />
                      {event.location}
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
              ))}
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
