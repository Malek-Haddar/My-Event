import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsers, reset } from "../features/users/userSlice";

import CategoryForm from "../components/category/CategoryForm";
import {
  affectSessionToCategory,
  deleteCategory,
  getCategories,
} from "../features/categories/categorySlice";
import { getSessions } from "../features/sessions/sessionSlice";

import { Header, Navbar } from "../components/dashboard";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import "../App.css";
import { Footer, Sidebar, ThemeSettings } from "../components/dashboard";

import { useStateContext } from "../contexts/ContextProvider";
import { SiIfixit, SiVerizon } from "react-icons/si";

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
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

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

  const clearCategory = () => {
    const data = {
      categoryId,
    };
    dispatch(deleteCategory(data));
    dispatch(getCategories());
  };

  return (
    <>
      <CategoryForm />
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
                  <Header category="Page" title="Categories" />
                  <div className="px-4 py-3 text-left sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      data-toggle="modal"
                      data-target="#addOrderModalside"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className="overflow-auto">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="table-responsive align-content-center h-2/3"
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
                                          onChange={(e) =>
                                            setCategoryId(e.target.value)
                                          }
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
                                      className="text-primary border-1 rounded-md"
                                      onChange={(e) =>
                                        setSessionId(e.target.value)
                                      }
                                    >
                                      <option value="">- Select -</option>

                                      {sessions.map((session) => (
                                        <option
                                          key={session._id}
                                          value={session._id}
                                        >
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
                                        <SiVerizon />
                                      </a>
                                      <a
                                        onClick={() => {
                                          clearCategory();
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
    </>
  );
}

export default Category;
