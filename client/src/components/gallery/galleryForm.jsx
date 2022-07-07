import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent, reset } from "../../features/events/eventSlice";
import Spinner from "../../components/Spinner";
import FileBase from "react-file-base64";
import { createGallery } from "../../features/gallery/gallerySlice";
import { toast } from "react-toastify";

function GalleryForm() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    selectedFile: "",
  });

  const { name, category, selectedFile } = formData;

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

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const onChange = (e) => {
    setFormData((prevSate) => ({
      ...prevSate,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const galleryData = {
      name,
      category,
      selectedFile,
    };
    dispatch(createGallery(galleryData), setFormData(""));
    toast("Picture added successfully👏");
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <div className="modal fade" id="addOrderModalside">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Event</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="text-black font-w500">Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={category}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label className="text-black font-w500">Select File</label>

                <div className="form-control">
                  {/* <FileBase
                    type="file"
                    multiple={false}
                    // name="selectedFile"
                    // value={selectedFile}
                    // onChange={onChange}
                    onDone={({ base64 }) =>
                      setFormData({ ...galleryData, selectedFile: base64 })
                    }
                  /> */}

                  <FileBase
                    type="file"
                    multiple={false}
                    onDone={({ base64 }) =>
                      setFormData({ ...formData, selectedFile: base64 })
                    }
                  />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary text-black">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryForm;
