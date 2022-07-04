import { Link } from "react-router-dom";

function OldNavbar() {
  return (
    <div style={{ background: "white" }}>
      <div className="nav-header">
        <Link to="/dashboard" className="brand-logo">
          <img className="logo-abbr" src="../assets/images/logo.png" alt="" />
          <img
            className="logo-compact"
            src="../assets/images/logo-text.png"
            alt=""
          />
          <img
            className="brand-title"
            src="../assets/images/logo-text.png"
            alt=""
          />
        </Link>

        <div className="nav-control">
          <div className="hamburger">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </div>

      <div className="chatbox">
        <div className="chatbox-close"></div>
        <div className="custom-tab-1">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <Link className="nav-link" data-toggle="tab" to="#notes">
                Notes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" data-toggle="tab" to="#alerts">
                Alerts
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" data-toggle="tab" to="#chat">
                Chat
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="chat"
              role="tabpanel"
            >
              <div className="card mb-sm-3 mb-md-0 contacts_card dz-chat-user-box">
                <div className="card-header chat-list-header text-center">
                  <Link to="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect
                          fill="#000000"
                          x="4"
                          y="11"
                          width="16"
                          height="2"
                          rx="1"
                        />
                        <rect
                          fill="#000000"
                          opacity="0.3"
                          transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) "
                          x="4"
                          y="11"
                          width="16"
                          height="2"
                          rx="1"
                        />
                      </g>
                    </svg>
                  </Link>
                  <div>
                    <h6 className="mb-1">Chat List</h6>
                    <p className="mb-0">Show All</p>
                  </div>
                  <Link to="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <circle fill="#000000" cx="5" cy="12" r="2" />
                        <circle fill="#000000" cx="12" cy="12" r="2" />
                        <circle fill="#000000" cx="19" cy="12" r="2" />
                      </g>
                    </svg>
                  </Link>
                </div>
                <div
                  className="card-body contacts_body p-0 dz-scroll  "
                  id="DZ_W_Contacts_Body"
                >
                  <ul className="contacts">
                    <li className="name-first-letter">A</li>
                    <li className="active dz-chat-user">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src="../assets/images/avatar/1.jpg"
                            className="rounded-circle user_img"
                            alt=""
                          />
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>Archie Parker</span>
                          <p>Kalid is online</p>
                        </div>
                      </div>
                    </li>
                    <li className="dz-chat-user">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src="../assets/images/avatar/2.jpg"
                            className="rounded-circle user_img"
                            alt=""
                          />
                          <span className="online_icon offline"></span>
                        </div>
                        <div className="user_info">
                          <span>Alfie Mason</span>
                          <p>Taherah left 7 mins ago</p>
                        </div>
                      </div>
                    </li>
                    <li className="dz-chat-user">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont">
                          <img
                            src="../assets/images/avatar/3.jpg"
                            className="rounded-circle user_img"
                            alt=""
                          />
                          <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                          <span>AharlieKane</span>
                          <p>Sami is online</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="card chat dz-chat-history-box d-none">
                <div className="card-header chat-list-header text-center">
                  <Link to="" className="dz-chat-history-back">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <polygon points="0 0 24 0 24 24 0 24" />
                        <rect
                          fill="#000000"
                          opacity="0.3"
                          transform="translate(15.000000, 12.000000) scale(-1, 1) rotate(-90.000000) translate(-15.000000, -12.000000) "
                          x="14"
                          y="7"
                          width="2"
                          height="10"
                          rx="1"
                        />
                        <path
                          d="M3.7071045,15.7071045 C3.3165802,16.0976288 2.68341522,16.0976288 2.29289093,15.7071045 C1.90236664,15.3165802 1.90236664,14.6834152 2.29289093,14.2928909 L8.29289093,8.29289093 C8.67146987,7.914312 9.28105631,7.90106637 9.67572234,8.26284357 L15.6757223,13.7628436 C16.0828413,14.136036 16.1103443,14.7686034 15.7371519,15.1757223 C15.3639594,15.5828413 14.7313921,15.6103443 14.3242731,15.2371519 L9.03007346,10.3841355 L3.7071045,15.7071045 Z"
                          fill="#000000"
                          fillRule="nonzero"
                          transform="translate(9.000001, 11.999997) scale(-1, -1) rotate(90.000000) translate(-9.000001, -11.999997) "
                        />
                      </g>
                    </svg>
                  </Link>
                  <div>
                    <h6 className="mb-1">Chat with Khelesh</h6>
                    <p className="mb-0 text-success">Online</p>
                  </div>
                  <div className="dropdown">
                    <Link to="" data-toggle="dropdown">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="18px"
                        height="18px"
                        viewBox="0 0 24 24"
                        version="1.1"
                      >
                        <g
                          stroke="none"
                          strokeWidth="1"
                          fill="none"
                          fillRule="evenodd"
                        >
                          <rect x="0" y="0" width="24" height="24" />
                          <circle fill="#000000" cx="5" cy="12" r="2" />
                          <circle fill="#000000" cx="12" cy="12" r="2" />
                          <circle fill="#000000" cx="19" cy="12" r="2" />
                        </g>
                      </svg>
                    </Link>
                    <ul className="dropdown-menu dropdown-menu-right">
                      <li className="dropdown-item">
                        <i className="fa fa-user-circle text-primary mr-2"></i>{" "}
                        View profile
                      </li>
                      <li className="dropdown-item">
                        <i className="fa fa-users text-primary mr-2"></i> Add to
                        close friends
                      </li>
                      <li className="dropdown-item">
                        <i className="fa fa-plus text-primary mr-2"></i> Add to
                        group
                      </li>
                      <li className="dropdown-item">
                        <i className="fa fa-ban text-primary mr-2"></i> Block
                      </li>
                    </ul>
                  </div>
                </div>
                <div
                  className="card-body msg_card_body dz-scroll"
                  id="DZ_W_Contacts_Body3"
                >
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Hi, how are you samim?
                      <span className="msg_time">8:40 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Hi Khalid i am good tnx how about you?
                      <span className="msg_time_send">8:55 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am good too, thank you for your chat template
                      <span className="msg_time">9:00 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      You are welcome
                      <span className="msg_time_send">9:05 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am looking for your next templates
                      <span className="msg_time">9:07 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Ok, thank you have a good day
                      <span className="msg_time_send">9:10 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Bye, see you
                      <span className="msg_time">9:12 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Hi, how are you samim?
                      <span className="msg_time">8:40 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Hi Khalid i am good tnx how about you?
                      <span className="msg_time_send">8:55 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am good too, thank you for your chat template
                      <span className="msg_time">9:00 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      You are welcome
                      <span className="msg_time_send">9:05 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      I am looking for your next templates
                      <span className="msg_time">9:07 AM, Today</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end mb-4">
                    <div className="msg_cotainer_send">
                      Ok, thank you have a good day
                      <span className="msg_time_send">9:10 AM, Today</span>
                    </div>
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/2.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-start mb-4">
                    <div className="img_cont_msg">
                      <img
                        src="../assets/images/avatar/1.jpg"
                        className="rounded-circle user_img_msg"
                        alt=""
                      />
                    </div>
                    <div className="msg_cotainer">
                      Bye, see you
                      <span className="msg_time">9:12 AM, Today</span>
                    </div>
                  </div>
                </div>
                <div className="card-footer type_msg">
                  <div className="input-group">
                    <textarea
                      className="form-control"
                      placeholder="Type your message..."
                    ></textarea>
                    <div className="input-group-append">
                      <button type="button" className="btn btn-primary">
                        <i className="fa fa-location-arrow"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="alerts" role="tabpanel">
              <div className="card mb-sm-3 mb-md-0 contacts_card">
                <div className="card-header chat-list-header text-center">
                  <Link to="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <circle fill="#000000" cx="5" cy="12" r="2" />
                        <circle fill="#000000" cx="12" cy="12" r="2" />
                        <circle fill="#000000" cx="19" cy="12" r="2" />
                      </g>
                    </svg>
                  </Link>
                  <div>
                    <h6 className="mb-1">Notications</h6>
                    <p className="mb-0">Show All</p>
                  </div>
                  <Link to="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <path
                          d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                          fill="#000000"
                          fillRule="nonzero"
                          opacity="0.3"
                        />
                        <path
                          d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                          fill="#000000"
                          fillRule="nonzero"
                        />
                      </g>
                    </svg>
                  </Link>
                </div>
                <div
                  className="card-body contacts_body p-0 dz-scroll"
                  id="DZ_W_Contacts_Body1"
                >
                  <ul className="contacts">
                    <li className="name-first-letter">SEVER STATUS</li>
                    <li className="active">
                      <div className="d-flex bd-highlight">
                        <div className="img_cont primary">KK</div>
                        <div className="user_info">
                          <span>David Nester Birthday</span>
                          <p className="text-primary">Today</p>
                        </div>
                      </div>
                    </li>
                    <li className="name-first-letter">SOCIAL</li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont success">
                          RU<i className="icon fa-birthday-cake"></i>
                        </div>
                        <div className="user_info">
                          <span>Perfection Simplified</span>
                          <p>Jame Smith commented on your status</p>
                        </div>
                      </div>
                    </li>
                    <li className="name-first-letter">SEVER STATUS</li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont primary">
                          AU<i className="icon fa fa-user-plus"></i>
                        </div>
                        <div className="user_info">
                          <span>AharlieKane</span>
                          <p>Sami is online</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="img_cont info">
                          MO<i className="icon fa fa-user-plus"></i>
                        </div>
                        <div className="user_info">
                          <span>Athan Jacoby</span>
                          <p>Nargis left 30 mins ago</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
            <div className="tab-pane fade" id="notes">
              <div className="card mb-sm-3 mb-md-0 note_card">
                <div className="card-header chat-list-header text-center">
                  <Link to="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect
                          fill="#000000"
                          x="4"
                          y="11"
                          width="16"
                          height="2"
                          rx="1"
                        />
                        <rect
                          fill="#000000"
                          opacity="0.3"
                          transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) "
                          x="4"
                          y="11"
                          width="16"
                          height="2"
                          rx="1"
                        />
                      </g>
                    </svg>
                  </Link>
                  <div>
                    <h6 className="mb-1">Notes</h6>
                    <p className="mb-0">Add New Nots</p>
                  </div>
                  <Link to="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="18px"
                      height="18px"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <g
                        stroke="none"
                        strokeWidth="1"
                        fill="none"
                        fillRule="evenodd"
                      >
                        <rect x="0" y="0" width="24" height="24" />
                        <path
                          d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z"
                          fill="#000000"
                          fillRule="nonzero"
                          opacity="0.3"
                        />
                        <path
                          d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z"
                          fill="#000000"
                          fillRule="nonzero"
                        />
                      </g>
                    </svg>
                  </Link>
                </div>
                <div
                  className="card-body contacts_body p-0 dz-scroll"
                  id="DZ_W_Contacts_Body2"
                >
                  <ul className="contacts">
                    <li className="active">
                      <div className="d-flex bd-highlight">
                        <div className="user_info">
                          <span>New order placed..</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className="ml-auto">
                          <Link
                            to=""
                            className="btn btn-primary btn-xs sharp mr-1"
                          >
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <Link to="" className="btn btn-danger btn-xs sharp">
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="user_info">
                          <span>Youtube, a video-sharing website..</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className="ml-auto">
                          <Link
                            to=""
                            className="btn btn-primary btn-xs sharp mr-1"
                          >
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <Link to="" className="btn btn-danger btn-xs sharp">
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="user_info">
                          <span>john just buy your product..</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className="ml-auto">
                          <Link
                            to=""
                            className="btn btn-primary btn-xs sharp mr-1"
                          >
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <Link to="" className="btn btn-danger btn-xs sharp">
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex bd-highlight">
                        <div className="user_info">
                          <span>Athan Jacoby</span>
                          <p>10 Aug 2020</p>
                        </div>
                        <div className="ml-auto">
                          <Link
                            to=""
                            className="btn btn-primary btn-xs sharp mr-1"
                          >
                            <i className="fa fa-pencil"></i>
                          </Link>
                          <Link to="" className="btn btn-danger btn-xs sharp">
                            <i className="fa fa-trash"></i>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="header-content">
          <nav className="navbar navbar-expand">
            <div className="collapse navbar-collapse justify-content-between">
              <div className="header-left">
                <div className="dashboard_bar">Dashboard</div>
              </div>
              <ul className="navbar-nav header-right">
                <li className="nav-item">
                  <div className="input-group search-area d-xl-inline-flex d-none">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search here..."
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <Link to="">
                          <i className="flaticon-381-search-2"></i>
                        </Link>
                      </span>
                    </div>
                  </div>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  <Link
                    className="nav-link  ai-icon"
                    to=""
                    role="button"
                    data-toggle="dropdown"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12.8333 5.91732V3.49998C12.8333 2.85598 13.356 2.33331 14 2.33331C14.6428 2.33331 15.1667 2.85598 15.1667 3.49998V5.91732C16.9003 6.16698 18.5208 6.97198 19.7738 8.22498C21.3057 9.75681 22.1667 11.8346 22.1667 14V18.3913L23.1105 20.279C23.562 21.1831 23.5142 22.2565 22.9822 23.1163C22.4513 23.9761 21.5122 24.5 20.5018 24.5H15.1667C15.1667 25.144 14.6428 25.6666 14 25.6666C13.356 25.6666 12.8333 25.144 12.8333 24.5H7.49817C6.48667 24.5 5.54752 23.9761 5.01669 23.1163C4.48469 22.2565 4.43684 21.1831 4.88951 20.279L5.83333 18.3913V14C5.83333 11.8346 6.69319 9.75681 8.22502 8.22498C9.47919 6.97198 11.0985 6.16698 12.8333 5.91732ZM14 8.16664C12.4518 8.16664 10.969 8.78148 9.87469 9.87581C8.78035 10.969 8.16666 12.453 8.16666 14V18.6666C8.16666 18.8475 8.12351 19.026 8.04301 19.1881C8.04301 19.1881 7.52384 20.2265 6.9755 21.322C6.88567 21.5028 6.89501 21.7186 7.00117 21.8901C7.10734 22.0616 7.29517 22.1666 7.49817 22.1666H20.5018C20.7037 22.1666 20.8915 22.0616 20.9977 21.8901C21.1038 21.7186 21.1132 21.5028 21.0234 21.322C20.475 20.2265 19.9558 19.1881 19.9558 19.1881C19.8753 19.026 19.8333 18.8475 19.8333 18.6666V14C19.8333 12.453 19.2185 10.969 18.1242 9.87581C17.0298 8.78148 15.547 8.16664 14 8.16664Z"
                        fill="#FE634E"
                      />
                    </svg>
                    <div className="pulse-css"></div>
                  </Link>
                  <div className="dropdown-menu rounded dropdown-menu-right">
                    <div
                      id="DZ_W_Notification1"
                      className="widget-media dz-scroll p-3 height380"
                    >
                      <ul className="timeline">
                        <li>
                          <div className="timeline-panel">
                            <div className="media mr-2">
                              <img
                                alt="image"
                                width="50"
                                src="../assets/images/avatar/1.jpg"
                              />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Dr sultads Send you Photo
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media mr-2 media-info">KG</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Resport created successfully
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media mr-2 media-success">
                              <i className="fa fa-home"></i>
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Reminder : Treatment Time!
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media mr-2">
                              <img
                                alt="image"
                                width="50"
                                src="../assets/images/avatar/1.jpg"
                              />
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Dr sultads Send you Photo
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media mr-2 media-danger">KG</div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Resport created successfully
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="timeline-panel">
                            <div className="media mr-2 media-primary">
                              <i className="fa fa-home"></i>
                            </div>
                            <div className="media-body">
                              <h6 className="mb-1">
                                Reminder : Treatment Time!
                              </h6>
                              <small className="d-block">
                                29 July 2020 - 02:26 PM
                              </small>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <Link className="all-notification" to="">
                      See all notifications <i className="ti-arrow-right"></i>
                    </Link>
                  </div>
                </li>
                <li className="nav-item dropdown notification_dropdown">
                  <Link className="nav-link bell bell-link" to="">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M25.6666 8.16666C25.6666 5.5895 23.5771 3.5 21 3.5C17.1161 3.5 10.8838 3.5 6.99998 3.5C4.42281 3.5 2.33331 5.5895 2.33331 8.16666V23.3333C2.33331 23.8058 2.61798 24.2305 3.05315 24.4113C3.48948 24.5922 3.99115 24.4918 4.32481 24.1582C4.32481 24.1582 6.59281 21.8902 7.96714 20.517C8.40464 20.0795 8.99733 19.8333 9.61683 19.8333H21C23.5771 19.8333 25.6666 17.7438 25.6666 15.1667V8.16666ZM23.3333 8.16666C23.3333 6.87866 22.2891 5.83333 21 5.83333C17.1161 5.83333 10.8838 5.83333 6.99998 5.83333C5.71198 5.83333 4.66665 6.87866 4.66665 8.16666V20.517L6.31631 18.8673C7.19132 17.9923 8.37899 17.5 9.61683 17.5H21C22.2891 17.5 23.3333 16.4558 23.3333 15.1667V8.16666ZM8.16665 15.1667H17.5C18.144 15.1667 18.6666 14.644 18.6666 14C18.6666 13.356 18.144 12.8333 17.5 12.8333H8.16665C7.52265 12.8333 6.99998 13.356 6.99998 14C6.99998 14.644 7.52265 15.1667 8.16665 15.1667ZM8.16665 10.5H19.8333C20.4773 10.5 21 9.97733 21 9.33333C21 8.68933 20.4773 8.16666 19.8333 8.16666H8.16665C7.52265 8.16666 6.99998 8.68933 6.99998 9.33333C6.99998 9.97733 7.52265 10.5 8.16665 10.5Z"
                        fill="#FE634E"
                      />
                    </svg>
                    <div className="pulse-css"></div>
                  </Link>
                </li>
                <li className="nav-item dropdown header-profile">
                  <Link
                    className="nav-link"
                    to=""
                    role="button"
                    data-toggle="dropdown"
                  >
                    <img
                      src="../assets/images/profile/17.jpg"
                      width="20"
                      alt=""
                    />
                    {/* <div className="header-info">
                      <span className="text-black">
                         <strong>Brian Lee</strong> 
                      </span>
                      <p className="fs-12 mb-0">Admin</p>
                    </div> */}
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right">
                    <Link
                      to="./app-profile.html"
                      className="dropdown-item ai-icon"
                    >
                      <svg
                        id="icon-user1"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-primary"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <span className="ml-2">Profile </span>
                    </Link>
                    <Link
                      to="./email-inbox.html"
                      className="dropdown-item ai-icon"
                    >
                      <svg
                        id="icon-inbox"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-success"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                      <span className="ml-2">Inbox </span>
                    </Link>
                    <Link
                      to="./page-login.html"
                      className="dropdown-item ai-icon"
                    >
                      <svg
                        id="icon-logout"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-danger"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span className="ml-2">Logout </span>
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>

      <div className="deznav">
        <div className="deznav-scroll">
          <Link
            to=""
            className="add-menu-sidebar"
            data-toggle="modal"
            data-target="#addOrderModalside"
          >
            + New
          </Link>
          <ul className="metismenu" id="menu">
            <li>
              <Link className="has-arrow ai-icon" to="" aria-expanded="false">
                <i className="flaticon-381-networking"></i>
                <span className="nav-text">Dashboard</span>
              </Link>
              <ul aria-expanded="false">
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/event">Event</Link>
                </li>
                <li>
                  <Link to="/sessions">Sessions</Link>
                </li>
                <li>
                  <Link to="/Attendees">Attendees</Link>
                </li>
                <li>
                  <Link to="/pictures">Gallery</Link>
                </li>
                <li>
                  <Link to="/category">Categories</Link>
                </li>
                <li>
                  <Link to="/quiz-item">Quizzes</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OldNavbar;
