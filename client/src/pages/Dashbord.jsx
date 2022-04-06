import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../features/auth/authSlice";
import { getSessions } from "../features/sessions/sessionSlice";
import { checkIn, getUsers } from "../features/users/userSlice";

function Dashbord() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { sessions, isLoading, isError, message } = useSelector(
    (state) => state.sessions
  );
  const { users } = useSelector((state) => state.users);

  const [formData, setFormData] = useState({
    idUser: "",
    idSession: "",
  });

  const { idUser, idSession } = formData;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }
    dispatch(getSessions());
    dispatch(getUsers());

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

    const userData = {
      idUser,
      idSession,
    };

    dispatch(checkIn(userData));
  };

  return (
    <>
      <section className="page-header bg_img padding-tb">
        <div className="overlay"></div>
        <div className="container">
          <div className="page-header-content-area">
            <h4 className="ph-title">CHECK IN PAGE</h4>
            <ul className="lab-ul">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="#">Features</a>
              </li>
              <li>
                <a className="active">Check In</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="login-section padding-tb">
        <div className="container">
          <div className="account-wrapper">
            <h3 className="title">Check in Now</h3>

            {sessions ? (
              <>
                <form onSubmit={onSubmit}>
                  <select
                    onChange={(e) => {
                      setFormData({ ...formData, idSession: e.target.value });
                    }}
                  >
                    <option value={""}>- Select -</option>
                    {sessions.map((s) => (
                      <option key={s._id} name="idSession" value={s._id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => {
                      setFormData({ ...formData, idUser: e.target.value });
                    }}
                  >
                    <option value={""}>- Select -</option>
                    {users.map((u) => (
                      <option key={u._id} name="idUser" value={u._id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn-out btn-block mt-3">
                    Submit
                  </button>
                </form>
              </>
            ) : (
              <br />
            )}

            <div className="account-bottom">
              <span className="d-block cate pt-10">
                Are you a member? <a href="login.html">Login</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashbord;
