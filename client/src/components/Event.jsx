import React, { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getEvents, reset } from "../features/events/eventSlice";
import CountDown from "./event/CountDown";
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
    // return () => {
    //   dispatch(reset());
    // };
  }, [navigate, isError, message, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <section className="banner-section ">
      <div className="container">
        <div className="banner-wrapper shape-a">
          <div className="row gy-3 flex justify-center">
            <div className="banner-content text-center">
              <h1> {events[0]?.name} </h1>
              {events[0]?.date && <CountDown />}
            </div>
            <div className="event-sponsored">
              <div className="banner-image flex justify-center">
                <img
                  src="assets/images/banner/cover-moot.jpg"
                  className="rounded-lg shadow-2xl md:w-2/3 h-full"
                  alt="banner-img"
                />
              </div>
            </div>
            <div className="col-lg-6 col-12 flex items-center justify-center text-center">
              <div className="banner-content ">
                <div className="md:block items-center mb-4">
                  <h5 className="flex justify-center text-2xl mr-4 my-2 ">
                    <FaMapMarkerAlt />
                    {events[0]?.location}
                  </h5>

                  <h5 className="text-2xl ">
                    {events[0]?.description} <br />{" "}
                  </h5>
                </div>
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
                  <Link to="/calendar" className="lab-btn disable ">
                    <span>consulte schedule</span>{" "}
                  </Link>
                )}

                {/* <div className="event-sponsored">
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
                </div> */}
              </div>
              {/* ))} */}
            </div>
            {/* <div className="col-lg-6 col-12 flex items-start justify-center">
              <div className="banner-image ">
                <img
                  src="assets/images/banner/cover-moot.jpg"
                  className="rounded-lg shadow-2xl w-full h-full"
                  alt="banner-img"
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Event;
