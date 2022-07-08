import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/users/userSlice";

import EventForm from "../components/event/EventForm";
import { deleteEvent, getEvents } from "../features/events/eventSlice";
import { getSessions } from "../features/sessions/sessionSlice";

import { Header, Navbar } from "../components/dashboard";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import "../App.css";
import { Footer, Sidebar, ThemeSettings } from "../components/dashboard";

import {
  ColumnDirective,
  ColumnsDirective,
  Edit,
  ExcelExport,
  Filter,
  GridComponent,
  Inject,
  Page,
  PdfExport,
  Selection,
  Sort,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import { useStateContext } from "../contexts/ContextProvider";
import avatar3 from "../data/avatar3.png";

import { customersGrid } from "../data/dummy";

import "../App.css";
import { SiIfixit } from "react-icons/si";
import { toast } from "react-toastify";

// import { getUsers, reset } from "../features/profiles/profileSlice";

function Event() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [eventId, setEventId] = useState("");

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
    console.log({ events });
    dispatch(getSessions());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const clearEvent = () => {
    const data = {
      eventId,
    };

    dispatch(deleteEvent(data));
    dispatch(getEvents());
    toast.error("🛑 Event has been deleted ");
  };

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

  return (
    <>
      <EventForm />
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
            <div className="relative md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
                <div className="py-8">
                  <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
                    <h2 className=" text-2xl font-bold text-black">Events</h2>
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
                          <tr>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                            >
                              Name
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                            >
                              Location
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                            >
                              Description
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                            >
                              Date
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                            ></th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map((event) => (
                            <tr>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0  custom-checkbox">
                                    {/* <a href="#" className="block relative">
                                      <img
                                        alt="profil"
                                        src="/images/person/8.jpg"
                                        className="mx-auto object-cover rounded-full h-10 w-10 "
                                      />
                                    </a>*/}

                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id={event._id}
                                      required=""
                                      onChange={(e) =>
                                        setEventId(e.target.value)
                                      }
                                      value={event._id}
                                    />
                                    <label
                                      className="custom-control-label"
                                      htmlFor={event._id}
                                    ></label>
                                  </div>

                                  <div className="ml-3">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                      {event.name}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {event.location}
                                </p>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {event.description}
                                </p>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                  <span
                                    aria-hidden="true"
                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
                                  ></span>
                                  <span className="relative">
                                    {new Date(event.date).toLocaleString(
                                      "en-US"
                                    )}
                                  </span>
                                </span>
                              </td>
                              <td className="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                <a
                                  type="submit"
                                  className="text-red-500 hover:text-rose-900"
                                  onClick={() => {
                                    clearEvent();
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
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
