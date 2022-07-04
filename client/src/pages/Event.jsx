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

  const customersData = events.map((profile) => ({
    CustomerID: profile?._id,
    CustomerName: profile?.name,
    CustomerEmail: "",
    CustomerImage: avatar3,
    ProjectName: profile?.description,
    Status: profile?.status,
    Weeks: profile?.isPublic,
    Budget: profile?.date,
    Location: profile?.location,
  }));
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
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}

              <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div className="flex items-center">
                  <Header category="Page" title="Events" />
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
                            className="table card-table display dataTablesCard  table-auto overflow-scroll w-full"
                          >
                            <thead>
                              <tr>
                                <th></th>

                                <th>Name</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Location</th>

                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {events.map((event) => (
                                <tr key={event._id}>
                                  <td>
                                    <div className="checkbox mr-0 align-self-center">
                                      <div className="custom-control custom-checkbox ">
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
                                    </div>
                                  </td>

                                  <td> {event.name}</td>
                                  <td>
                                    {" "}
                                    {new Date(event.date).toLocaleString(
                                      "en-US"
                                    )}{" "}
                                  </td>

                                  <td>
                                    <span className="text-wrap">
                                      {event.description}{" "}
                                    </span>
                                  </td>
                                  <td> {event.location}</td>

                                  <td>
                                    <div className="d-flex align-items-center ">
                                      <a
                                        type="submit"
                                        onClick={() => {
                                          clearEvent();
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
              {/* <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
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
                </GridComponent>
              </div> */}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Event;
