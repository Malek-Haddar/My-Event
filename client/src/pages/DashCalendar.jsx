import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import {
  Agenda,
  Day,
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from "@syncfusion/ej2-react-schedule";
import React, { useEffect, useState, useMemo } from "react";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import {
  Footer,
  Header,
  Navbar,
  Sidebar,
  ThemeSettings,
} from "../components/dashboard";
import { useStateContext } from "../contexts/ContextProvider";
import { scheduleData } from "../data/dummy";
import { getSessions, reset } from "../features/sessions/sessionSlice";

// eslint-disable-next-line react/destructuring-assignment
const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;

const DashCalendar = () => {
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
  const { sessions, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //   navigate("/login");
    // }

    dispatch(getSessions());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  const [scheduleObj, setScheduleObj] = useState();

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };
  const scheduleData = sessions?.map((session) => ({
    Id: session?._id,
    Subject: session?.name,
    Location: session?.details,
    StartTime: session?.start,
    EndTime: session?.end,
    CategoryColor: "#1aaa55",
  }));
  console.log({ scheduleData });

  return (
    !!sessions && (
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
                <Header category="App" title="Calendar" />
                {scheduleData.length > 0 ? (
                  <ScheduleComponent
                    height="650px"
                    ref={(schedule) => setScheduleObj(schedule)}
                    // selectedDate={new Date(2021, 0, 10)} i change the date*
                    selectedDate={new Date()}
                    eventSettings={{ dataSource: scheduleData || [] }}
                    dragStart={onDragStart}
                    readonly={true}
                    // created={dispatch(createGoal()}
                  >
                    <ViewsDirective>
                      {["Day", "Week", "WorkWeek", "Month", "Agenda"].map(
                        (item) => (
                          <ViewDirective key={item} option={item} />
                        )
                      )}
                    </ViewsDirective>
                    <Inject
                      services={[
                        Day,
                        Week,
                        WorkWeek,
                        Month,
                        Agenda,
                        Resize,
                        DragAndDrop,
                      ]}
                    />
                  </ScheduleComponent>
                ) : null}

                <PropertyPane>
                  <table style={{ width: "100%", background: "white" }}>
                    <tbody>
                      <tr style={{ height: "50px" }}>
                        <td style={{ width: "100%" }}>
                          {scheduleData.length > 0 ? (
                            <DatePickerComponent
                              value={new Date()}
                              showClearButton={false}
                              placeholder="Current Date"
                              floatLabelType="Always"
                              change={change}
                            />
                          ) : null}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </PropertyPane>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    )
  );
};

export default DashCalendar;
