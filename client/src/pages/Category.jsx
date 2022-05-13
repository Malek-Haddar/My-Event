import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, reset } from "../features/users/userSlice";

import Spinner from "../components/Spinner";
import Navbar from "../components/dashboard/Navbar";
import {
  affectSessionToCategory,
  getCategories,
} from "../features/categories/categorySlice";
import { getSessions } from "../features/sessions/sessionSlice";

function Category() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { sessions } = useSelector((state) => state.sessions);
  const [sessionId, setSessionId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  const role = (a) => {
    if (a === 0) return "User";
    if (a === 1) return "Moderator";
    if (a === 2) return "Admin";
    return "Admin";
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getUsers());
    dispatch(getSessions());
    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(categories);

  const affectCategory = () => {
    const data = {
      idCategory: categoryId,
      idSession: sessionId,
    };
    console.log(data);
    dispatch(affectSessionToCategory(data));
  };
  if (isLoading) {
    return <Spinner />;
  }

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
                              htmlFor="checkAll"
                            ></label>
                          </div>
                        </div>
                      </th>

                      <th>Name</th>
                      <th>Session</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category._id}>
                        <td>
                          <div className="checkbox mr-0 align-self-center">
                            <div className="custom-control custom-checkbox ">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={category._id}
                                required=""
                                onChange={(e) => setCategoryId(e.target.value)}
                                value={category._id}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={category._id}
                              ></label>
                            </div>
                          </div>
                        </td>

                        <td>{category.name}</td>

                        <td>
                          <select
                            className="text-primary"
                            onChange={(e) => setSessionId(e.target.value)}
                          >
                            <option value="">- Select -</option>

                            {sessions.map((session) => (
                              <option key={session._id} value={session._id}>
                                {session.name}
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
                                affectCategory();
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

export default Category;
