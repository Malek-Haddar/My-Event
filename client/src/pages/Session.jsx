import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import SessionForm from "../components/session/SessionForm";
import Spinner from "../components/Spinner";
import { getCategories } from "../features/categories/categorySlice";
import { getEvents } from "../features/events/eventSlice";
import {
  affectSessionToCategory,
  affectSessionToEvent,
  getSessions,
  reset,
} from "../features/sessions/sessionSlice";

function Session() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [eventId, setEventId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.events);
  const { categories } = useSelector((state) => state.categories);
  const { sessions, userSession, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getSessions());
    dispatch(getEvents());
    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(sessions);

  const affectEvent = () => {
    const data = {
      idSession: sessionId,
      idEvent: eventId,
    };
    console.log(data);
    dispatch(affectSessionToEvent(data));
  };
  const affectCategory = () => {
    const data = {
      idSession: sessionId,
      idCategory: categoryId,
    };
    console.log(data);
    dispatch(affectSessionToCategory(data));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
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
                      <th></th>

                      <th>Name</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Details</th>
                      <th>Event</th>
                      <th>Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session) => (
                      <tr key={session._id}>
                        <td>
                          <div className="checkbox mr-0 align-self-center">
                            <div className="custom-control custom-checkbox ">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={session._id}
                                required=""
                                onChange={(e) => setSessionId(e.target.value)}
                                value={session._id}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={session._id}
                              ></label>
                            </div>
                          </div>
                        </td>

                        <td> {session.name}</td>
                        <td>
                          {" "}
                          {new Date(session.start).toLocaleString("en-US")}{" "}
                        </td>
                        <td>
                          {" "}
                          {new Date(session.end).toLocaleString("en-US")}{" "}
                        </td>
                        <td>
                          <span className="text-nowrap">
                            {session.details}{" "}
                          </span>
                        </td>
                        <td>
                          <select
                            className="text-primary"
                            onChange={(e) => setEventId(e.target.value)}
                          >
                            <option value="">{session?.event?.name}</option>

                            {events.map((event) => (
                              <option key={event._id} value={event._id}>
                                {event.name}
                              </option>
                            ))}
                          </select>
                        </td>

                        <td>
                          <div className="d-flex align-items-center">
                            <a
                              className="mr-4"
                              type="submit"
                              onClick={() => {
                                affectEvent();
                              }}
                            >
                              <i className="las la-pencil-alt scale-2 text-danger"></i>
                            </a>
                            <a>
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

export default Session;
