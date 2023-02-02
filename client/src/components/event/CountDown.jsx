import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../features/events/eventSlice";
import { useTranslation, initReactI18next } from "react-i18next";


const CountDown = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  useMemo(() => {
    if (isError) {
      console.log(message);
    }

    dispatch(getEvents());
  }, [isError, message, dispatch]);

  return (
    <ul
      id="countdown"
      className="countdown count-down justify-center"
      data-date={events[0].date}
    >
      <li className="clock-item">
        <span className="count-number days px-1"></span>
        <p className="count-text">{t('Days')}</p>
      </li>

      <li className="clock-item">
        <span className="count-number hours"></span>
        <p className="count-text">{t('Hour')}</p>
      </li>

      <li className="clock-item">
        <span className="count-number minutes"></span>
        <p className="count-text">{t('Min')}</p>
      </li>

      <li className="clock-item">
        <span className="count-number seconds"></span>
        <p className="count-text">{t('Sec')}</p>
      </li>
    </ul>
  );
};

export default CountDown;
