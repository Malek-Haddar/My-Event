import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  affectQuizToSession,
  getQuizzes,
  reset,
} from "../../features/quiz/quizSlice";
import Spinner from "../Spinner";
import QuizForm from "./QuizForm";
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

import { customersData, customersGrid } from "../../data/dummy";
import { Header } from "../dashboard";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { Navbar, Footer, Sidebar, ThemeSettings } from "../dashboard";
import "../../App.css";

import { useStateContext } from "../../contexts/ContextProvider";
// import { getUsers, reset } from "../features/profiles/profileSlice";
import avatar3 from "../../data/avatar3.png";
import { SiIfixit, SiVerizon } from "react-icons/si";
import { getSessions } from "../../features/sessions/sessionSlice";

const QuizItem = () => {
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.auth);
  const { quizzes, isLoading, isError, message } = useSelector(
    (state) => state.quizzes
  );

  // useEffect(() => {
  //   if (isError) {
  //     console.log(message);
  //   }

  //   if (!user) {
  //     navigate("/login");
  //   }

  //   dispatch(getQuizzes());

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [user, navigate, isError, message, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }

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
  const { sessions } = useSelector((state) => state.sessions);
  const [sessionId, setSessionId] = useState("");
  const [quizId, setQuizId] = useState("");

  // const { user } = useSelector((state) => state.auth);
  // const { users, isLoading, isError, message } = useSelector(
  //   (state) => state.users
  // );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //   navigate("/login");
    // }

    dispatch(getQuizzes());
    dispatch(getSessions());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);
  console.log({ quizzes });

  // const affectCategory = () => {
  //   const data = {
  //     idCategory: categoryId,
  //     idSession: sessionId,
  //   };
  //   console.log(data);
  //   dispatch(affectSessionToCategory(data));
  // };

  const affectToSession = () => {
    const data = {
      idQuiz: quizId,
      idSession: sessionId,
    };
    console.log(data);
    dispatch(affectQuizToSession(data));
  };

  // const clearQuiz = () => {
  //   const data = {
  //     quizId,
  //   };
  //   dispatch(deleteQuiz(data));
  //   dispatch(getQuizzes());
  // };
  const selectionsettings = { persistSelection: true };
  const toolbarOptions = [
    "Add",
    "Edit",
    "Delete",
    "Update",
    "Cancel",
    "PdfExport",
    "ExcelExport",
  ];
  const editing = {
    allowDeleting: true,
    allowEditing: true,
    allowAdding: true,
    allowPdfExport: true,
    allowExcelExport: true,
  };

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const customersData = quizzes.map((profile) => ({
    CustomerID: profile?._id,
    CustomerName: profile?.description,
    CustomerEmail: "",
    CustomerImage: avatar3,
    ProjectName: profile?.alternatives[1]?.text,
    Status: profile?.alternatives[2]?.text,
    Weeks: profile?.alternatives[3]?.text,
    Budget: profile?.alternatives[4]?.text,
    Location: profile?.alternatives[0]?.text,
  }));

  return (
    <>
      <QuizForm />
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
                  <Header category="Page" title="Quiz List" />
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
                          className="table-responsive  align-content-center h-2/3 "
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
                                <th>Answers</th>
                                <th>Session</th>

                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {quizzes.map((quiz) => (
                                <tr key={quiz._id}>
                                  <td>
                                    <div className="checkbox mr-0 align-self-center">
                                      <div className="custom-control custom-checkbox ">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={quiz._id}
                                          required=""
                                          onChange={(e) =>
                                            setQuizId(e.target.value)
                                          }
                                          value={quiz._id}
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor={quiz._id}
                                        ></label>
                                      </div>
                                    </div>
                                  </td>

                                  <td>
                                    <span className="text-nowrap">
                                      {quiz.description}
                                    </span>
                                  </td>
                                  <td>
                                    <select className="text-primary border-1 rounded-md w-full">
                                      {quiz.alternatives.map((answer) => (
                                        <option
                                          key={answer._id}
                                          value={answer.text}
                                        >
                                          {answer.text}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
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
                                          affectToSession();
                                        }}
                                      >
                                        <SiVerizon />
                                      </a>
                                      <a
                                      // onClick={() => {
                                      //   clearQuiz();
                                      // }}
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
      {/* <div className="content-body">
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

                      <th>Description</th>
                      <th>Alternatives</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizzes?.map((quiz) => (
                      <tr key={quiz?._id}>
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
                        <td>
                          <span className="text-nowrap">
                            {quiz?.description}{" "}
                          </span>
                        </td>
                        {quiz?.alternatives.map((a) => (
                          <td>{a.text}</td>
                        ))}

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
      </div> */}
    </>
  );
};

export default QuizItem;
