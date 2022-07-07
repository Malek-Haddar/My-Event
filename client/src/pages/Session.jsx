import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getEvents } from "../features/events/eventSlice";
import {
  affectSessionToEvent,
  deleteSession,
  getSessions,
  reset,
} from "../features/sessions/sessionSlice";

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

import { Header, Navbar } from "../components/dashboard";
import { customersGrid } from "../data/dummy";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import "../App.css";
import { Footer, Sidebar, ThemeSettings } from "../components/dashboard";

import { useStateContext } from "../contexts/ContextProvider";
import avatar3 from "../data/avatar3.png";
import SessionForm from "../components/session/SessionForm";
import { SiIfixit, SiVerizon } from "react-icons/si";
import { toast } from "react-toastify";

function Session() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [eventId, setEventId] = useState("");
  const [sessionId, setSessionId] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { events } = useSelector((state) => state.events);
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

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const affectEvent = () => {
    const data = {
      idSession: sessionId,
      idEvent: eventId,
    };
    dispatch(affectSessionToEvent(data));
    toast("Session Affected 👏");
  };
  const clearSession = () => {
    const data = {
      sessionId,
    };
    dispatch(deleteSession(data));
    dispatch(getSessions());
    toast.error("🛑 User has been deleted ");
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

  // // const { user } = useSelector((state) => state.auth);
  // const { users, isLoading, isError, message } = useSelector(
  //   (state) => state.users
  // );
  // useEffect(() => {
  //   if (isError) {
  //     console.log(message);
  //   }

  //   // if (!user) {
  //   //   navigate("/login");
  //   // }

  //   dispatch(getUsers());

  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [navigate, isError, message, dispatch]);
  // console.log({ users });
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

  const customersData = sessions.map((profile) => ({
    CustomerID: profile?._id,
    CustomerName: profile?.name,
    CustomerEmail: "",
    CustomerImage: avatar3,
    ProjectName: profile?.start,
    Status: profile?.end,
    Weeks: profile?.details,
    Budget: profile?.likes?.length,
    Location: "Tunisia",
  }));
  // if (isLoading) {
  //   return <Spinner />;
  // }
  // function toggleModal() {
  //   document.getElementById("modal").classList.toggle("hidden");
  // }

  return (
    <>
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
                  <Header category="Page" title="Sessions" />
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
                <div className="overflow-auto ">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="table-responsive align-content-center h-4/5"
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
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Details</th>
                                <th>Event</th>
                                <th></th>
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
                                          onChange={(e) =>
                                            setSessionId(e.target.value)
                                          }
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
                                    {new Date(session.start).toLocaleString(
                                      "en-US"
                                    )}{" "}
                                  </td>
                                  <td>
                                    {" "}
                                    {new Date(session.end).toLocaleString(
                                      "en-US"
                                    )}{" "}
                                  </td>
                                  <td>
                                    <span className="text-nowrap">
                                      {session.details}{" "}
                                    </span>
                                  </td>
                                  <td>
                                    <select
                                      className="text-primary border-1 rounded-md  rounded-md "
                                      onChange={(e) =>
                                        setEventId(e.target.value)
                                      }
                                    >
                                      {session?.event ? (
                                        <option value="">
                                          {session?.event?.name}
                                        </option>
                                      ) : (
                                        <option value="">- Select -</option>
                                      )}
                                      {events.map((event) => (
                                        <option
                                          key={event._id}
                                          value={event._id}
                                        >
                                          {event.name}
                                        </option>
                                      ))}
                                    </select>
                                  </td>

                                  <td>
                                    <div className="d-flex align-items-center ">
                                      <a
                                        className="mr-4 "
                                        type="submit"
                                        onClick={() => {
                                          affectEvent();
                                        }}
                                      >
                                        {" "}
                                        <SiVerizon />
                                      </a>
                                      <a
                                        type="submit"
                                        onClick={() => {
                                          clearSession();
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
                {/*
                <GridComponent
                  id="grid"
                  dataSource={customersData}
                  enableHover
                  allowPaging
                  pageSettings={{ pageCount: 5 }}
                  selectionSettings={selectionsettings}
                  toolbar={toolbarOptions}
                  editSettings={editing}
                  allowSorting={true}
                  allowExcelExport={true}
                  allowPdfExport={true}
                >
                  <ColumnsDirective>
                  
                    {customersGrid.map((item, index) => (
                      <ColumnDirective key={index} {...item} />
                    ))}
                  </ColumnsDirective>
                  <Inject
                    services={[
                      Page,
                      Selection,
                      Toolbar,
                      Edit,
                      Sort,
                      Filter,
                      PdfExport,
                      ExcelExport,
                    ]}
                  />
                </GridComponent> */}
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>

      <SessionForm />
    </>
  );
}

export default Session;
