import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import GalleryForm from "../components/gallery/galleryForm";
import Spinner from "../components/Spinner";
import { useStateContext } from "../contexts/ContextProvider";
import { deleteGallery, getGalleries } from "../features/gallery/gallerySlice";
import { reset } from "../features/sessions/sessionSlice";

import { Header } from "../components/dashboard";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { FiSettings } from "react-icons/fi";

import "../App.css";
import { Footer, Sidebar, ThemeSettings } from "../components/dashboard";
import { SiIfixit } from "react-icons/si";

function Pictures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [galleryId, setGalleryId] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { galleries, isLoading, isError, message } = useSelector(
    (state) => state.galleries
  );

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getGalleries());
    console.log(galleries);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const clearPicture = () => {
    const data = {
      galleryId,
    };
    dispatch(deleteGallery(data));
    dispatch(getGalleries());
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }

  return (
    <>
      <div className={currentMode === "Dark" ? "dark" : ""}>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>
            <div>
              {themeSettings && <ThemeSettings />}
              <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
                <div className="flex items-center">
                  <Header category="Page" title="Gallery" />
                  <div className="px-4 py-3 text-left sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-sky-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      data-toggle="modal"
                      data-target="#addOrderModalside"
                    >
                      Add
                    </button>
                  </div>
                </div>
                <GalleryForm />
                <div className="overflow-auto">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-xl-12">
                        <div
                          className="table-responsive  align-content-center h-2/3"
                          style={{ borderRadius: "5px" }}
                        >
                          <table
                            id="example2"
                            className="table card-table display dataTablesCard table-auto overflow-scroll w-full"
                          >
                            <thead>
                              <tr>
                                <th>
                                  <div className="checkbox mr-0 align-self-center">
                                    <div className="custom-control custom-checkbox ">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="checkAll"
                                        required=""
                                      />
                                      <label
                                        className="custom-control-label"
                                        htmlFor="checkAll"
                                      ></label>
                                    </div>
                                  </div>
                                </th>

                                <th>Name</th>
                                <th>Category</th>

                                <th>Picture</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {galleries.map((gallery) => (
                                <tr key={gallery._id}>
                                  <td>
                                    <div className="checkbox mr-0 align-self-center">
                                      <div className="custom-control custom-checkbox ">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id={gallery._id}
                                          required=""
                                          onChange={(e) =>
                                            setGalleryId(e.target.value)
                                          }
                                          value={gallery._id}
                                        />
                                        <label
                                          className="custom-control-label"
                                          htmlFor={gallery._id}
                                        ></label>
                                      </div>
                                    </div>
                                  </td>

                                  <td>{gallery.name}</td>
                                  <td>
                                    <span className="text-nowrap">
                                      {gallery.category}
                                    </span>
                                  </td>

                                  <td style={{ width: "30%", height: "30%" }}>
                                    <span className="text-primary">
                                      <img
                                        src={gallery.selectedFile}
                                        alt=""
                                        className="img-responsive rounded-md "
                                      />
                                    </span>
                                  </td>
                                  <td>
                                    <div className="d-flex align-items-center mr-16">
                                      <a
                                        type="submit"
                                        onClick={() => {
                                          clearPicture();
                                        }}
                                      >
                                        <SiIfixit />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Pictures;
