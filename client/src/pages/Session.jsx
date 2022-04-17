import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import SessionForm from "../components/session/SessionForm";
import Spinner from "../components/Spinner";
import { getSessions, reset } from "../features/sessions/sessionSlice";

function Session() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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
    console.log(sessions);

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
      <div className="content-body">
        <div className="container-fluid">
          <SessionForm />
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Profile Datatable</h4>
                </div>
                <div className="card-body ">
                  <div className="table-responsive align-content-center">
                    <table id="example3" className="display min-w850  ">
                      <thead className="text-black">
                        <tr>
                          <th></th>
                          <th>Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody className="text-black ">
                        {sessions.map((session) => (
                          <tr key={session._id}>
                            <td>
                              <img
                                className="rounded-circle"
                                width="35"
                                src="images/profile/small/pic1.jpg"
                                alt=""
                              />
                            </td>

                            <td>
                              <a href="javascript:void(0);">
                                <strong className="text-black">
                                  {session.name}
                                </strong>
                              </a>
                            </td>
                            <td>
                              {new Date(session.start).toLocaleString("en-US")}
                            </td>
                            <td>
                              {new Date(session.end).toLocaleString("en-US")}
                            </td>
                            <td> {session.details}</td>
                            <td>
                              <div className="d-flex">
                                <a
                                  href="#"
                                  className="btn btn-primary shadow btn-xs sharp mr-1"
                                >
                                  <i className="fa fa-pencil"></i>
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-danger shadow btn-xs sharp"
                                >
                                  <i className="fa fa-trash"></i>
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
        </div>
      </div>
    </>
  );
}

export default Session;
