import React, { useState } from "react";
import "./ChatHeader.css";
import NotificationsIcon from "@material-ui/icons/Notifications";
import EditLocationRoundedIcon from "@material-ui/icons/EditLocationRounded";
import PeopleAltRoundedIcon from "@material-ui/icons/PeopleAltRounded";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { MdAutorenew } from "react-icons/md";
import axios from "./axios";
import { selectChannelId } from "../../features/appSlice";

function ChatHeader({ channelName }) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const channelId = useSelector(selectChannelId);

  const [messages, setMessages] = useState([]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };
  const getConversation = async (channelId) => {
    if (channelId) {
      const conversation = await axios.get(
        `api/get/conversation?id=${channelId}`
      );
      setMessages(conversation.data[0].conversation);
    }
  };
  const handleRefresh = async () => {
    await getConversation(channelId);
  };
  return (
    <div className="chatHeader">
      <div className="chatHeader__left flex items-center space-x-2">
        <h3>
          <span className="chatHeader__hash">#</span>
          {channelName}
        </h3>
        <span>
          <MdAutorenew
            onClick={handleRefresh}
            className="sidebar__addChannel mr-2"
          />
        </span>
      </div>

      <div className=" flex justify-end ">
        {/* <NotificationsIcon />
        <EditLocationRoundedIcon />
        <PeopleAltRoundedIcon />

        <div className="chatHeader__search">
          <input placeholder="Search" />
          <span className="chatHeader__searchIcon">
            <SearchRoundedIcon />
          </span>
        </div> */}
        <a type="submit" className="sidebar__profileInfo">
          <SendRoundedIcon onClick={onLogout} />
          leave
        </a>

        {/* <HelpRoundedIcon /> */}
      </div>
    </div>
  );
}

export default ChatHeader;
