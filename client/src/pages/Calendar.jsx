import React, { useEffect, useState } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
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
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { getUserSession, reset } from "../features/sessions/sessionSlice";
import { useNavigate } from "react-router-dom";
function Calendar() {
  const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;
  const [scheduleObj, setScheduleObj] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { user } = useSelector((state) => state.auth);
  const { userSession, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user) {
    //   navigate("/login");
    // }

    dispatch(getUserSession());

    return () => {
      dispatch(reset());
    };
  }, [navigate, isError, message, dispatch]);
  console.log({ userSession });

  const change = (args) => {
    scheduleObj.selectedDate = args.value;
    scheduleObj.dataBind();
  };

  const onDragStart = (arg) => {
    // eslint-disable-next-line no-param-reassign
    arg.navigation.enable = true;
  };

  const scheduleData = [
    {
      Id: userSession[0]?.category[0]?.sessions[0]?._id,
      Subject: userSession[0]?.category[0]?.sessions[0]?.name,
      Location: userSession[0]?.category[0]?.sessions[0]?.details,
      StartTime: userSession[0]?.category[0]?.sessions[0]?.start,
      EndTime: userSession[0]?.category[0]?.sessions[0]?.end,
      CategoryColor: "#1aaa55",
    },
  ];
  return (
    <>
      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">Event Calendar</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a className="active">Calendar</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section>
        <div className="m-4 md:m-10 mt-24 p-8 md:p-16 bg-white rounded-3xl">
          <ScheduleComponent
            height="650px"
            ref={(schedule) => setScheduleObj(schedule)}
            selectedDate={userSession[0]?.category[0]?.sessions[0]?.start}
            eventSettings={{ dataSource: scheduleData }}
            dragStart={onDragStart}
            readonly={false}
            // created={dispatch(createGoal()}
          >
            <ViewsDirective>
              {["Day", "Week", "WorkWeek", "Month", "Agenda"].map((item) => (
                <ViewDirective key={item} option={item} />
              ))}
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
          <PropertyPane>
            <table style={{ width: "100%", background: "white" }}>
              <tbody>
                <tr style={{ height: "50px" }}>
                  <td style={{ width: "100%" }}>
                    <DatePickerComponent
                      value={userSession[0]?.category[0]?.sessions[0]?.start}
                      showClearButton={false}
                      placeholder="Current Date"
                      floatLabelType="Always"
                      change={change}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </PropertyPane>
        </div>
      </section>
    </>
  );
}

export default Calendar;
