import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getQuizzes, reset } from "../../features/quiz/quizSlice";
import Navbar from "../dashboard/Navbar";
import Spinner from "../Spinner";
import QuizForm from "./QuizForm";

const QuizItem = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { quizzes, isLoading, isError, message } = useSelector(
    (state) => state.quizzes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(getQuizzes());

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
      <QuizForm />

      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-12">
              <div
                className="table-responsive  align-content-center"
                style={{
                  borderRadius: "5px",
                }}
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

                      <th>Description</th>
                      <th>Alternatives</th>

                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {quizzes?.map((quiz) => (
                      <tr key={quiz?._id}>
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
                        <td>
                          <span className="text-nowrap">
                            {quiz?.description}{" "}
                          </span>
                        </td>
                        {quiz?.alternatives.map((a) => (
                          <td>{a.text}</td>
                        ))}

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
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizItem;
