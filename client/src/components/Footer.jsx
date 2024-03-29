import React from "react";
import { useSelector } from "react-redux";
// import Background from "../assets/images/bg-images/footer-bg.png";
import { QRCodeSVG } from "qrcode.react";

function Footer() {
  const { user } = useSelector((state) => state.auth);

  var sectionStyle = {
    // backgroundImage: "url(" + "../assets/images/bg-images/footer-bg.png" + ")",
    backgroundImage: `url("../assets/images/bg-images/footer-bg.png")`,
  };

  return (
    <>
      <footer className="footer-section " style={sectionStyle}>
        <div className="footer-top  md:block hidden">
          <div className="container">
            <div className="row g-3 justify-content-center g-lg-0">
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="footer-top-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img
                        src="assets/images/footer/footer-top/01.png"
                        alt="Phone-icon"
                      />
                    </div>
                    <div className="lab-content">
                      <span>Phone : +216 70 867 014</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="footer-top-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img
                        src="assets/images/footer/footer-top/02.png"
                        alt="email-icon"
                      />
                    </div>
                    <div className="lab-content">
                      <span>Email : contact@iwatch.tn</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="footer-top-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img
                        src="assets/images/footer/footer-top/01.png"
                        alt="location-icon"
                      />
                    </div>
                    <div className="lab-content">
                      <span>
                        <a
                          href="https://www.instagram.com/iwatchtn/?fbclid=IwAR0NZSJ5U9RhwQjwsLyLfNrqy7KJY71kPsirEo5cas0s3X5ufJDbwLK4Hfs"
                          target="_blank"
                        >
                          {" "}
                          Instagram : iwatchtn
                        </a>{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="footer-bottom-content text-center">
                  {/* {user && (
                    <div className="flex justify-center text-center">
                      <QRCodeSVG value={user.result.email} />
                    </div>
                  )} */}
                  <p>© i-techrity.tn, Inc. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
