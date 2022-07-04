import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createEvent, reset } from "../../features/events/eventSlice";
import Spinner from "../../components/Spinner";

function EventForm() {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    description: "",
    location: "",
    isPublic: "false",
    status: "",
  });

  const { name, date, description, location, isPublic, status } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
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

    const eventData = {
      name,
      date,
      description,
      location,
      isPublic,
      status,
    };
    dispatch(createEvent(eventData), setFormData(""));
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
                <label className="text-black font-w500">Event Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Event Date</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  value={date}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={description}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Location</label>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={location}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Public</label>
                <input
                  type="checkbox"
                  // className="form-control"
                  name="isPublic"
                  value={isPublic}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Status</label>
                <input
                  type="text"
                  className="form-control"
                  name="status"
                  value={status}
                  onChange={onChange}
                />
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

export default EventForm;
