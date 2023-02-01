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
import { useDispatch, useSelector } from "react-redux";
import { getUserSession, reset } from "../features/sessions/sessionSlice";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation, initReactI18next } from "react-i18next";


function Calendar() {
  const PropertyPane = (props) => <div className="mt-5">{props.children}</div>;
  const [scheduleObj, setScheduleObj] = useState();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userSession, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user || !userSession[0]?.category) {
    //   navigate("/");
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

  const scheduleData = userSession[0]?.category[0]?.sessions.map((session) => ({
    Id: session?._id,
    Subject: session?.name,
    Location: session?.details,
    StartTime: session?.start,
    EndTime: session?.end,
    CategoryColor: "#1aaa55",
  }));
  return (
    <>
      <Header />

      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">{t('Event Calendar')}</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">{t('Home')}</a>
              </li>
              <li>
                <a className="active">{t('Calendar')}</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {userSession[0]?.category[0]?.sessions[0] > "0" ? (
        <section className="pb-36">
          <div className=" bg-white rounded-3xl md:mx-36 md:p-4 items-center ">
            <ScheduleComponent
              height="650px"
              ref={(schedule) => setScheduleObj(schedule)}
              selectedDate={new Date()}
              eventSettings={{ dataSource: scheduleData }}
              dragStart={onDragStart}
              readonly={true}
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
                        value={new Date()}
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
      ) : null}
      <Footer />
    </>
  );
}

export default Calendar;
