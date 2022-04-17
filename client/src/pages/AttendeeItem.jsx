import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, reset } from "../features/users/userSlice";

import Spinner from "../components/Spinner";
import Navbar from "../components/dashboard/Navbar";

function AttendeeItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getUsers());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(users);

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
                              for="checkAll"
                            ></label>
                          </div>
                        </div>
                      </th>
                      <th>Attendee_ID</th>
                      <th>Role</th>
                      <th>Name</th>
                      <th>Email</th>

                      <th>Category</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
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
                                for="customCheckBox2"
                              ></label>
                            </div>
                          </div>
                        </td>
                        <td>{user._id}</td>
                        <td>{user.role}</td>
                        <td>{user.name}</td>
                        <td>
                          <span className="text-nowrap">{user.email}</span>
                        </td>

                        <td>
                          <span className="text-primary">{user.category} </span>
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <a href="javascript:void(0)" className="mr-4">
                              <i className="las la-pencil-alt scale-2 text-danger"></i>
                            </a>
                            <a href="javascript:void(0)">
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

export default AttendeeItem;
