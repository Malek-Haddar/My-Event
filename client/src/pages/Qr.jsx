import React, { Component } from "react";
import QrReader from "react-qr-reader";
import Header from "../components/Header";

class Qr extends Component {
  state = {
    result: "No result",
  };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };
  render() {
    return (
      <>
        <Header />
        <section className="page-header bg_img padding-tb pb-16 rounded">
          <div className="overlay"></div>
          <div className="container">
            <div className="page-header-content-area">
              <h4 className="ph-title">QR Code Scanner</h4>
              <ul className="lab-ul">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a className="active">QR</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <QrReader
              delay={300}
              onError={this.handleError}
              onScan={this.handleScan}
              style={{ width: "50%" }}
            />
            <div className="mt-4">
              <p>{this.state.result}</p>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Qr;
