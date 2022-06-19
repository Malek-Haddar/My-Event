import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../features/auth/authSlice";
import { createQuiz, reset } from "../../features/quiz/quizSlice";
import Navbar from "../dashboard/Navbar";
import Spinner from "../Spinner";

const QuizForm = () => {
  const [formData, setFormData] = useState({
    description: "",
    firstAlternative: { text: "", isCorrect: false },
    secondAlternative: { text: "", isCorrect: false },
    thirdAlternative: { text: "", isCorrect: false },
  });

  const { description, firstAlternative, secondAlternative, thirdAlternative } =
    formData;

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

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  // const onChange = (e) => {
  //   setFormData((prevSate) => ({
  //     ...prevSate,
  //     description: e.target.value,
  //   }));
  // };

  const onSubmit = (e) => {
    e.preventDefault();

    const quizData = {
      description: e.target.description.value,
      alternatives: [
        {
          text: e.target.firstAlternative.value,
          isCorrect: e.target.firstCorrectAnswer.checked,
        },
        {
          text: e.target.secondAlternative.value,
          isCorrect: e.target.secondCorrectAnswer.checked,
        },
        {
          text: e.target.thirdAlternative.value,
          isCorrect: e.target.thirdCorrectAnswer.checked,
        },
      ],
    };
    dispatch(createQuiz(quizData), setFormData(""));
  };

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
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
                  <label className="text-black font-w500">Quiz Question</label>

                  <input
                    type="text"
                    className="form-control"
                    name="description"
                  />
                </div>

                <div className="form-group">
                  <label className="text-black font-w500">Answer1</label>
                  <div className=" d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="firstCorrectAnswer"
                      className="mr-2"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="firstAlternative"
                    />
                  </div>
                  <label className="text-black font-w500">Answer2</label>
                  <div className=" d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="secondCorrectAnswer"
                      className="mr-2"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="secondAlternative"
                    />
                  </div>
                  <label className="text-black font-w500">Answer3</label>
                  <div className=" d-flex align-items-center">
                    <input
                      type="checkbox"
                      name="thirdCorrectAnswer"
                      className="mr-2"
                    />
                    <input
                      type="text"
                      className="form-control"
                      name="thirdAlternative"
                    />
                  </div>
                </div>

                {/* <div className="form-group">
                  <label className="text-black font-w500">Answer2</label>
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    value={text}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Answer3</label>
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    value={text}
                    onChange={onChange}
                  />
                </div>
                <div className="form-group">
                  <label className="text-black font-w500">Answer4</label>
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    value={text}
                    onChange={onChange}
                  />
                </div> */}
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizForm;
