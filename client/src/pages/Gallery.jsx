import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { getGalleries, reset } from "../features/gallery/gallerySlice";
import Footer from "../components/Footer";

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

    // return () => {
    //   dispatch(reset());
    // };
  }, [user, navigate, isError, message, dispatch]);

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <>
      <Header />
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
                <a className="active">Photos</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className=" my-20">
        <div className="gallery-section padding-tb">
          <div className="container">
            {/* {galleries.map((gallery) => ( */}
            <ul className="filter-button-group lab-ul d-flex justify-content-center mb-4 w-full">
              <li className="filter-btn is-checked" data-filter={""}>
                Show All{" "}
                <span className="filter-item-num"> {galleries.length} </span>
              </li>
              {/* <li className="filter-btn" data-filter=".eid-ul-adha">
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
              </li> */}
            </ul>
            {/* ))} */}

            <div className="grid flex d-flex flex-wrap  pb-15">
              {galleries.map((gallery) => (
                <div
                  className="grid-item eid-ul-adha eid-ul-fitr"
                  key={gallery._id}
                >
                  <div className="grid-inner d-flex h-100">
                    <div className="grid-thumb ">
                      <img
                        style={{ backgroundSize: "contain" }}
                        src={gallery.selectedFile}
                        alt={gallery.name}
                        value={gallery.category}
                      />
                    </div>
                    <div className="grid-content p-2  ">
                      <a
                        href={gallery.selectedFile}
                        data-rel={gallery.selectedFile}
                      >
                        <i className="icofont-expand"></i>
                      </a>
                      <h5>{gallery.name}</h5>
                      <p>{gallery.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Gallery;
