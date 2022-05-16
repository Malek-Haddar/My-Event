import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import GalleryForm from "../components/gallery/galleryForm";
import SessionForm from "../components/session/SessionForm";
import Spinner from "../components/Spinner";
import { getGalleries } from "../features/gallery/gallerySlice";
import { getSessions, reset } from "../features/sessions/sessionSlice";

function Pictures() {
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
    console.log(galleries);

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <GalleryForm />
      <div className="content-body ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="table-responsive  align-content-center"
                style={{ borderRadius: "5px" }}
              >
                <table
                  id="example2"
                  className="table card-table display dataTablesCard"
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
                      <th>Attendee_ID</th>

                      <th>Name</th>
                      <th>Category</th>

                      <th>Picture</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <div className="flex d-flex">
                      {galleries.map((gallery) => (
                        <tr key={gallery._id}>
                          <td>
                            <div className="checkbox mr-0 align-self-center">
                              <div className="custom-control custom-checkbox ">
                                <input
                                  type="checkbox"
                                  className="custom-control-input"
                                  id="customCheckBox2"
                                  required=""
                                />
                                <label
                                  className="custom-control-label"
                                  htmlFor="customCheckBox2"
                                ></label>
                              </div>
                            </div>
                          </td>
                          <td>{gallery._id}</td>

                          <td>{gallery.name}</td>
                          <td>
                            <span className="text-nowrap">
                              {gallery.category}
                            </span>
                          </td>

                          <td>
                            <span className="text-primary">
                              <img
                                src={gallery.selectedFile}
                                alt=""
                                style={{ width: "10%", height: "10%" }}
                              />
                            </span>
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              <a href="" className="mr-4">
                                <i className="las la-pencil-alt scale-2 text-danger"></i>
                              </a>
                              <a href="">
                                <i className="las la-trash-alt scale-2 text-danger"></i>
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </div>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pictures;
