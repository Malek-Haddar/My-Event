import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Selection,
  Inject,
  Edit,
  Toolbar,
  Sort,
  Filter,
  PdfExport,
  ExcelExport,
} from "@syncfusion/ej2-react-grids";

import { customersData, customersGrid } from "../data/dummy";
import { Header } from "../components/dashboard";

import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from "../components/dashboard";
import "../App.css";

import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getUsers, reset } from "../features/profiles/profileSlice";
import avatar3 from "../data/avatar3.png";
import { deleteCustomer, getUsers, reset } from "../features/users/userSlice";
import { SiIfixit, SiVerizon } from "react-icons/si";
import { affectCategoryToAttendee } from "../features/auth/authSlice";
import { getCategories } from "../features/categories/categorySlice";
import { toast } from "react-toastify";

const Customers = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

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
  console.log({ users });

  const affectCategory = () => {
    const data = {
      idUser: attendeeId,
      idCategory: categoryId,
    };
    dispatch(affectCategoryToAttendee(data));
    toast("User Affected 👏");
  };

  const clearCustomer = () => {
    const data = {
      customerId: attendeeId,
    };
    dispatch(deleteCustomer(data));
    dispatch(getUsers());
    toast.error("🛑 User has been deleted ");
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>
          <div>
            {themeSettings && <ThemeSettings />}
            <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
              <div className="flex items-center">
                <Header category="Page" title="Attendees List" />
              </div>
              <div className="overflow-auto">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-xl-12">
                      <div
                        className="table-responsive h-2/3 align-content-center"
                        style={{
                          borderRadius: "5px",
                        }}
                      >
                        <table
                          id="example2"
                          className="table card-table display dataTablesCard table-auto overflow-scroll w-full"
                        >
                          <thead>
                            <tr>
                              <th></th>

                              <th>Name</th>
                              <th> Role</th>
                              <th>Email</th>
                              <th>Check In</th>
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
                                        onChange={(e) =>
                                          setAttendeeId(e.target.value)
                                        }
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
                                <td>{user.email}</td>
                                <td>{user?.checkIn.length} </td>

                                <td>
                                  <select
                                    className="text-primary border-1 rounded-md"
                                    onChange={(e) =>
                                      setCategoryId(e.target.value)
                                    }
                                  >
                                    {users && user?.category[0] ? (
                                      <option value="">
                                        {user?.category[0]?.name}
                                      </option>
                                    ) : (
                                      <option value="">- Select -</option>
                                    )}
                                    {categories.map((category) => (
                                      <option
                                        key={category._id}
                                        value={category._id}
                                      >
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
                                      <SiVerizon />
                                    </a>
                                    <a
                                      type="submit"
                                      onClick={() => {
                                        clearCustomer();
                                      }}
                                    >
                                      <SiIfixit />
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
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Customers;
