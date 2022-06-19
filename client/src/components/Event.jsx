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

    // if (!user) {
    //   navigate("/login");
    // }

    dispatch(getEvents());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <section className="banner-section">
      <div className="container">
        <div className="banner-wrapper shape-a">
          <div className="row gy-5 align-items-center">
            <div className="col-lg-6 col-12">
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
                {!user ? (
                  <>
                    {events[0]?.isPublic === true &&
                    events[0]?.status === "open" ? (
                      <Link to="/" className="lab-btn">
                        <span>Join Now</span>{" "}
                      </Link>
                    ) : (
                      [
                        events[0]?.status === "closed" ||
                        events[0]?.status === "full" ? (
                          <Link to="#" className="lab-btn disable ">
                            <span>closed</span>{" "}
                          </Link>
                        ) : (
                          [
                            <Link to="/login" className="lab-btn">
                              <span>Sign In</span>{" "}
                            </Link>,
                          ]
                        ),
                      ]
                    )}
                  </>
                ) : (
                  <Link to="#" className="lab-btn disable ">
                    <span>consulte schedule</span>{" "}
                  </Link>
                )}

                <div className="event-sponsored">
                  <p>Event Sponsored By:</p>
                  <img
                    src="assets/images/banner/02.png"
                    alt="sponsor"
                    style={{
                      width: "210px",
                      height: "65px",
                      borderRadius: "2%",
                    }}
                  />
                </div>
              </div>
              {/* ))} */}
            </div>
            <div className="col-lg-6 col-12">
              <div className="banner-image">
                <img src="assets/images/banner/011.png" alt="banner-img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Event;
