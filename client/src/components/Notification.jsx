import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserSession, reset } from "../features/sessions/sessionSlice";

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const { userSession, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getUserSession());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log({ userSession });
  return (
    <>
      {userSession[0]?.category[0]?.notification?.length > 0 ? (
        <div className="cart-icon">
          <a>
            <i className="icofont-alarm hover:text-pink-600"></i>
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          </a>
          <div className="cart-content">
            <ul className="cart-list">
              <li className="cart-item">
                <div className="cart-inner">
                  <div className="cart-thumb">
                    <img
                      src="assets/images/footer/footer-middle/02.jpg"
                      alt="product"
                    />
                  </div>
                  <div className="cart-details">
                    <h5 className="text-xl">
                      <a href="#">
                        {userSession[0]?.category[0]?.notification}
                      </a>
                    </h5>
                    <p>
                      {" "}
                      <span className="text-xs"> from Organizer</span>
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
            {/* <a href="#" className="lab-btn">
          Checkout
        </a> */}
          </div>
        </div>
      ) : (
        <div className="cart-icon">
          <a>
            <i className="icofont-alarm hover:text-pink-600"></i>
          </a>
        </div>
      )}
    </>
  );
};

export default Notification;
