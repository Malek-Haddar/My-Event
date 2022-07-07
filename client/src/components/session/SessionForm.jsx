import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createSession, reset } from "../../features/sessions/sessionSlice";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

function SessionForm() {
  const [formData, setFormData] = useState({
    name: "",
    start: "",
    end: "",
    details: "",
  });

  const { name, start, end, details } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { sessions, isLoading, isError, message } = useSelector(
    (state) => state.sessions
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

    const sessionData = {
      name,
      start,
      end,
      details,
    };
    dispatch(createSession(sessionData), setFormData(""));
    toast("Session added successfully👏");
  };

  // if (isLoading) {
  //   return <Spinner />;
  // }
  return (
    <div className="modal fade" id="addOrderModalside">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add Session</h5>
            <button type="button" className="close" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label className="text-black font-w500">Session Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Session Start</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="start"
                  value={start}
                  onChange={onChange}
                />
              </div>
              <div className="form-group">
                <label className="text-black font-w500">Session End</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="end"
                  value={end}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label className="text-black font-w500">Details</label>
                <input
                  type="text"
                  className="form-control"
                  name="details"
                  value={details}
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

export default SessionForm;
