import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { getGalleries, reset } from "../features/gallery/gallerySlice";

function Gallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { galleries, isLoading, isError, message } = useSelector(
    (state) => state.galleries
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGalleries());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log(galleries);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Header />
      {/* {galleries.map((gallery) => (
        <div key={gallery._id}>
          <img src={gallery.selectedFile} alt={gallery.name} />
        </div>
      ))} */}

      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">Recent Event Photos</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#">Feature</a>
              </li>
              <li>
                <a className="active">Photos</a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="gallery-section padding-tb">
        <div className="container">
          <ul className="filter-button-group lab-ul d-flex justify-content-center mb-4">
            <li className="filter-btn is-checked" data-filter="*">
              Show All <span className="filter-item-num">09</span>
            </li>
            <li className="filter-btn" data-filter=".eid-ul-adha">
              Seminars <span className="filter-item-num">03</span>
            </li>
            <li className="filter-btn" data-filter=".eid-ul-fitr">
              Conferences <span className="filter-item-num">05</span>
            </li>
            <li className="filter-btn" data-filter=".ramadan">
              Workshops <span className="filter-item-num">06</span>
            </li>
            <li className="filter-btn" data-filter=".shab-e-barat">
              Reunions <span className="filter-item-num">03</span>
            </li>
          </ul>
          {galleries.map((gallery) => (
            <div className="grid pb-15" key={gallery._id}>
              <div className="grid-item eid-ul-adha eid-ul-fitr">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img src={gallery.selectedFile} alt={gallery.name} />
                  </div>
                  <div className="grid-content p-2">
                    <a href={gallery.selectedFile} data-rel="lightcase">
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item ramadan">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/02.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/02.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item ramadan shab-e-barat">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/03.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/03.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item ramadan eid-ul-fitr">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/04.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/04.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item shab-e-barat eid-ul-fitr">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/05.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/05.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item eid-ul-fitr eid-ul-adha">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/06.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/06.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item ramadan shab-e-barat">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/09.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/09.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item ramadan eid-ul-fitr">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/08.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/08.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
              <div className="grid-item ramadan eid-ul-adha">
                <div className="grid-inner">
                  <div className="grid-thumb">
                    <img
                      src={require("../assets/images/gallery/mason/07.jpg")}
                      alt="gallery-img"
                    />
                  </div>
                  <div className="grid-content">
                    <a
                      href="../assets/images/gallery/mason/07.jpg"
                      data-rel="lightcase"
                    >
                      <i className="icofont-expand"></i>
                    </a>
                    <h5>Title Goes Here</h5>
                    <p>Subtitle Here</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Gallery;
