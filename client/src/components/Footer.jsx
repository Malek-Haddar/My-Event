import React from "react";
// import Background from "../assets/images/bg-images/footer-bg.png";

function Footer() {
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
                      <span>Phone : +216 70867015</span>
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
                      <span>Email : contact@i-techrity.tn</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="footer-top-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img
                        src="assets/images/footer/footer-top/03.png"
                        alt="location-icon"
                      />
                    </div>
                    <div className="lab-content">
                      <span>
                        Address : 105, Rue Tahar Ben Ammar,
                        <br /> Menzah 9B, 1013 Tunis
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
