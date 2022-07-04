import { Avatar } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import "./Message.css";

function Message({ timestamp, message, userName }) {
  // const { user } = useSelector((state) => state.auth);

  return (
    <div className="message">
      <Avatar src={""} />
      <div className="message__info">
        <h4>
          {userName}
          <span className="message__timestamp">
            {new Date(parseInt(timestamp)).toUTCString()}
          </span>
        </h4>

        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;
