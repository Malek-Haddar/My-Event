import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, reset } from "../features/users/userSlice";

import Spinner from "../components/Spinner";
import Navbar from "../components/dashboard/Navbar";
import { getCategories } from "../features/categories/categorySlice";
import { getEvents } from "../features/events/eventSlice";
import { getSessions } from "../features/sessions/sessionSlice";
import EventForm from "../components/event/EventForm";

function Event() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { sessions } = useSelector((state) => state.sessions);
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
    dispatch(getSessions());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <EventForm />

      <div className="content-body ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="table-responsive  align-content-center"
                style={{
                  borderRadius: "5px",
                }}
              >
                <table
                  id="example2"
                  className="table card-table display dataTablesCard"
                >
                  <thead>
                    <tr>
                      <th>
                        <div className="checkbox mr-0 align-self-center">
                          <div className="custom-control custom-checkbox ">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="checkAll"
                              required=""
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="checkAll"
                            ></label>
                          </div>
                        </div>
                      </th>

                      <th>Name</th>
                      <th>Location</th>
                      <th>Date</th>
                      <th>Public</th>
                      <th>Status</th>
                      <th>Date</th>

                      <th>Description</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.map((event) => (
                      <tr key={event._id}>
                        <td>
                          <div className="checkbox mr-0 align-self-center">
                            <div className="custom-control custom-checkbox ">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheckBox2"
                                required=""
                              />
                              <label
                                className="custom-control-label"
                                htmlFor="customCheckBox2"
                              ></label>
                            </div>
                          </div>
                        </td>

                        <td>{event.name}</td>
                        <td>{event.location} </td>
                        <td>
                          {" "}
                          {new Date(event.date).toLocaleString("en-US")}{" "}
                        </td>
                        <td>
                          <div className="radio">{event.isPublic}</div>
                        </td>

                        <td>{event.status}</td>
                        <td>
                          <span className="text-nowrap">
                            {event.description}{" "}
                          </span>
                        </td>

                        {/* <td>
                          <select
                            className="text-primary" 
                          >
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        </td> */}
                        <td>
                          <div className="d-flex align-items-center">
                            <a href="" className="mr-4">
                              <i className="las la-pencil-alt scale-2 text-danger"></i>
                            </a>
                            <a href="">
                              <i className="las la-trash-alt scale-2 text-danger"></i>
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
