import React, { useState, useEffect } from "react";
import SidebarChannel from "./SidebarChannel";
import "./Sidebar.css";
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import { Avatar } from "@material-ui/core";
import MicIcon from "@material-ui/icons/Mic";
import HeadsetIcon from "@material-ui/icons/Headset";
import SettingsIcon from "@material-ui/icons/Settings";
import { useDispatch, useSelector } from "react-redux";
import axios from "./axios";
import Pusher from "pusher-js";
import { Link, useNavigate } from "react-router-dom";
import { SiPingdom } from "react-icons/si";
import { MdAutorenew } from "react-icons/md";

const pusher = new Pusher("5421ced7a2b4aa286dad", {
  cluster: "us2",
});

function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const [channels, setChannels] = useState([]);
  const [flag, setFlag] = useState(false);

  const getChannels = () => {
    axios.get("api/get/channelList").then((res) => {
      setChannels(res.data);
    });
  };

  useEffect(() => {
    getChannels();
    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannels();
    });
  }, [flag]);

  const handleAddChannel = (e) => {
    e.preventDefault();

    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      axios.post("api/new/channel", { channelName: channelName });
    }
    setFlag(!flag);
  };
  const handleRefresh = () => {
    getChannels();
  };

  // const getChannels = async () => {
  //   const channelsData = await axios.get("api/get/channelList");
  //   setChannels(channelsData.response);
  //   console.log(channelsData);
  // };

  // useEffect(() => {
  //   getChannels();
  // }, []);

  // useEffect(() => {
  //   getChannels();
  //   const channel = pusher.subscribe("channels");
  //   channel.bind("newChannel", function (data) {
  //     getChannels();
  //   });
  // }, [flag]);

  // const handleAddChannel = (e) => {
  //   e.preventDefault();

  //   const channelName = prompt("Enter a new channel name");

  //   if (channelName) {
  //     axios.post("api/new/channel", { channelName: channelName });
  //   }
  //   setFlag(!flag);
  // };

  // const handleRefresh = () => {
  //   getChannels();
  // };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <Link to="/" className="text-3xl">
          <SiPingdom />
        </Link>

        <h3>Pin Event </h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__header">
            <ExpandMoreIcon />
            <h4>Rooms</h4>
          </div>

          <div className="flex items-center">
            <span>
              <MdAutorenew
                onClick={handleRefresh}
                className="sidebar__addChannel mr-2"
              />
            </span>
            <span>
              <AddIcon
                onClick={handleAddChannel}
                className="sidebar__addChannel"
              />
            </span>
          </div>
        </div>
        <div className="sidebar__channelsList">
          {channels.length > 0 ? (
            <div className="sidebar__channelsList">
              {channels.map((channel) => (
                <SidebarChannel
                  key={channel.id}
                  id={channel.id}
                  channelName={channel.name}
                />
              ))}
            </div>
          ) : (
            <h1>No Data</h1>
          )}
        </div>
      </div>

      {/* <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />

        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>

        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div> */}

      <div className="sidebar__profile">
        <span className="sidebar__profileAvatar">
          <Avatar src={""} />
        </span>

        <div className="sidebar__profileInfo">
          <h3>@{user?.result?.name}</h3>
          {/* <p>#{user.uid.substring(0, 6)}</p> */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
