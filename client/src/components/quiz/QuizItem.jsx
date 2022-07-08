import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  affectQuizToSession,
  deleteQuiz,
  getQuizzes,
  reset,
} from "../../features/quiz/quizSlice";
import QuizForm from "./QuizForm";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import "../../App.css";
import { Footer, Navbar, Sidebar, ThemeSettings } from "../dashboard";

import { useStateContext } from "../../contexts/ContextProvider";
// import { getUsers, reset } from "../features/profiles/profileSlice";
import { getSessions } from "../../features/sessions/sessionSlice";
import { toast } from "react-toastify";

const QuizItem = () => {
  const { quizzes, isLoading, isError, message } = useSelector(
    (state) => state.quizzes
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

  const affectToSession = () => {
    const data = {
      idQuiz: quizId,
      idSession: sessionId,
    };
    console.log(data);
    dispatch(affectQuizToSession(data));
  };

  const clearQuiz = () => {
    const data = {
      quizId,
    };
    dispatch(deleteQuiz(data));
    console.log({ quizId });
    dispatch(getQuizzes());
    toast.error("🛑 Quiz has been deleted ");
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
              <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
                <div className="py-8">
                  <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className=" text-2xl font-bold text-black">Quizzes</h2>
                    <div className="text-end">
                      <div className="flex flex-col md:flex-row w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                        <button
                          className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200 text-center"
                          type="submit"
                          data-toggle="modal"
                          data-target="#addOrderModalside"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-xl overflow-hidden">
                      <table className="min-w-full leading-normal">
                        <thead>
                          {/*     <th>Name</th>
                                <th>Answers</th>
                                <th>Session</th> */}
                          <tr>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                            >
                              Answers
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                            >
                              Session
                            </th>

                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                            ></th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800   text-sm uppercase font-normal"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {quizzes.map((quiz) => (
                            <tr key={quiz._id}>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0  custom-checkbox">
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

                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {quiz.description}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <select className="text-gray-900  border-1 rounded-md w-full">
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
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <select
                                  className="text-gray-900  border-1 rounded-md"
                                  onChange={(e) => setSessionId(e.target.value)}
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

                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <a
                                  type="submit"
                                  className="text-green-500 hover:text-green-900"
                                  onClick={() => {
                                    affectToSession();
                                  }}
                                >
                                  Affect
                                </a>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <a
                                  type="submit"
                                  className="text-red-500 hover:text-rose-900"
                                  onClick={() => {
                                    clearQuiz();
                                  }}
                                >
                                  Delete
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="px-5 bg-white py-2 flex flex-col xs:flex-row items-center xs:justify-between">
                        <div className="flex items-center">
                          <button
                            type="button"
                            className="w-full p-3 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
                          >
                            <svg
                              width="9"
                              fill="currentColor"
                              height="8"
                              className=""
                              viewBox="0 0 1792 1792"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
                            </svg>
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 "
                          >
                            1
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                          >
                            2
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
                          >
                            3
                          </button>
                          <button
                            type="button"
                            className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
                          >
                            4
                          </button>
                          <button
                            type="button"
                            className="w-full p-3 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
                          >
                            <svg
                              width="9"
                              fill="currentColor"
                              height="8"
                              className=""
                              viewBox="0 0 1792 1792"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
              </div> */}
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
