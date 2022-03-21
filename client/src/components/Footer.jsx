import React from "react";
import Background from "../assets/images/bg-images/footer-bg.png";

function Footer() {
  var sectionStyle = {
    backgroundImage: "url(" + "../assets/images/bg-images/footer-bg.png" + ")",
  };

  return (
    <>
      <footer className="footer-section" style={sectionStyle}>
        <div className="footer-top">
          <div className="container">
            <div className="row g-3 justify-content-center g-lg-0">
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="footer-top-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img
                        src={require("../assets/images/footer/footer-top/01.png")}
                        alt="Phone-icon"
                      />
                    </div>
                    <div className="lab-content">
                      <span>Phone Number : +88019 339 702 520</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="footer-top-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img
                        src={require("../assets/images/footer/footer-top/02.png")}
                        alt="email-icon"
                      />
                    </div>
                    <div className="lab-content">
                      <span>Email : admin@Kagont.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 col-12">
                <div className="footer-top-item lab-item">
                  <div className="lab-inner">
                    <div className="lab-thumb">
                      <img
                        src={require("../assets/images/footer/footer-top/03.png")}
                        alt="location-icon"
                      />
                    </div>
                    <div className="lab-content">
                      <span>Address : 30 North West New York 240</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-middle padding-tb">
          <div className="container">
            <div className="row shape-c">
              <div className="col-lg-4 col-md-6 col-12">
                <div className="footer-middle-item-wrapper">
                  <div className="footer-middle-item mb-5 mb-lg-0">
                    <div className="fm-item-title">
                      <h5>About Kagont</h5>
                    </div>
                    <div className="fm-item-content">
                      <p className="mb-30">
                        Energistica coordinate highly eficient procesr
                        improvement viaing awesome
                      </p>
                      <img
                        className="rounded footer-abt-img"
                        src={require("../assets/images/footer/footer-middle/01.jpg")}
                        alt="about-image"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="footer-middle-item-wrapper">
                  <div className="footer-middle-item mb-5 mb-lg-0">
                    <div className="fm-item-title">
                      <h5>our Recent news</h5>
                    </div>
                    <div className="fm-item-content">
                      <div className="fm-item-widget lab-item">
                        <div className="lab-inner">
                          <div className="lab-thumb">
                            <a href="#">
                              {" "}
                              <img
                                src={require("../assets/images/footer/footer-middle/02.jpg")}
                                alt="footer-widget-img"
                              />
                            </a>
                          </div>
                          <div className="lab-content">
                            <h6>
                              <a href="#">
                                Evisculate Economicy Sound Technologies Before.
                              </a>
                            </h6>
                            <p>July 23, 2021</p>
                          </div>
                        </div>
                      </div>
                      <div className="fm-item-widget lab-item">
                        <div className="lab-inner">
                          <div className="lab-thumb">
                            <a href="#">
                              <img
                                src={require("../assets/images/footer/footer-middle/03.jpg")}
                                alt="footer-widget-img"
                              />
                            </a>
                          </div>
                          <div className="lab-content">
                            <h6>
                              <a href="#">
                                Globally initiate Global Niche Awesome Markets
                                For.
                              </a>
                            </h6>
                            <p>December 23, 2021</p>
                          </div>
                        </div>
                      </div>
                      <div className="fm-item-widget lab-item">
                        <div className="lab-inner">
                          <div className="lab-thumb">
                            <a href="#">
                              <img
                                src={require("../assets/images/footer/footer-middle/04.jpg")}
                                alt="footer-widget-img"
                              />
                            </a>
                          </div>
                          <div className="lab-content">
                            <h6>
                              <a href="#">
                                Authorita Underwhni Tactica Growth Stratege
                                Create
                              </a>
                            </h6>
                            <p>July 29, 2021</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                <div className="footer-middle-item-wrapper">
                  <div className="footer-middle-item-3 mb-5 mb-lg-0">
                    <div className="fm-item-title">
                      <h5>OUR NEWSLETTER</h5>
                    </div>
                    <div className="fm-item-content">
                      <p>
                        Kagont is a event organization supported by community
                        leaders
                      </p>
                      <form>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                          />
                        </div>
                        <button type="submit" className="lab-btn">
                          Send Massage <i className="icofont-paper-plane"></i>
                        </button>
                      </form>
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
                  <p>
                    &copy;2022 <a href="/">My Event</a> - Powered by I Techrity.
                  </p>
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
