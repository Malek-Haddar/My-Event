import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, reset } from "../features/users/userSlice";

import OldNavbar from "../components/dashboard/OldNavbar";
import Spinner from "../components/Spinner";
import { affectCategoryToAttendee } from "../features/auth/authSlice";
import { getCategories } from "../features/categories/categorySlice";

function AttendeeItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.categories);
  const { users, isLoading, isError, message } = useSelector(
    (state) => state.users
  );

  const [categoryId, setCategoryId] = useState("");
  const [attendeeId, setAttendeeId] = useState("");

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
    dispatch(getCategories());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const affectCategory = () => {
    const data = {
      idUser: attendeeId,
      idCategory: categoryId,
    };
    dispatch(affectCategoryToAttendee(data));
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <>
      <OldNavbar />
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
                      <th>Role</th>
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
                                id={user._id}
                                required=""
                                onChange={(e) => setAttendeeId(e.target.value)}
                                value={user._id}
                              />

                              <label
                                className="custom-control-label"
                                htmlFor={user._id}
                              ></label>
                            </div>
                          </div>
                        </td>

                        <td>{user.name}</td>
                        <td>{role(user.role)} </td>
                        <td>
                          <span className="text-nowrap">{user.email}</span>
                        </td>

                        <td>
                          <select
                            className="text-primary"
                            onChange={(e) => setCategoryId(e.target.value)}
                          >
                            {users ? (
                              <option value="">
                                {user?.category[0]?.name}
                              </option>
                            ) : (
                              <option value="">- Select -</option>
                            )}
                            {categories.map((category) => (
                              <option key={category._id} value={category._id}>
                                {category.name}
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

export default AttendeeItem;
