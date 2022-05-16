import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import VoteItem from "../components/vote/VoteItem";

function Vote() {
  return (
    <>
      <Header />
      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">Vote Please</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a className="active">Vote Session</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <VoteItem />
      {/* <Footer /> */}
    </>
  );
}

export default Vote;
