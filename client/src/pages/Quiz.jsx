import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { getQuizzes, reset } from "../features/quiz/quizSlice";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
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
      navigate("/");
    }

    dispatch(getQuizzes());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log({ quizzes });

  if (isLoading) {
    return <Spinner />;
  }
  const questions = quizzes.map((question) => ({
    questionText: question?.description,
    answerOptions: question.alternatives?.map((answer) => ({
      answerText: answer.text,
      isCorrect: answer.isCorrect,
    })),
  }));

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };
  return (
    !!questions.length && (
      <>
        <Header />
        <section className="page-header bg_img padding-tb pb-16 ">
          <div className="overlay"></div>
          <div className="container">
            <div className="page-header-content-area">
              <h4 className="ph-title">Quizz Session</h4>
              <ul className="lab-ul">
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a className="active">Quizz</a>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className="d-flex justify-content-center ">
          <div className="app">
            {showScore ? (
              <div className="score-section">
                You scored {score} out of {questions.length}
              </div>
            ) : (
              <>
                <div className="question-section">
                  <div className="question-count">
                    <span>Question {currentQuestion + 1}</span>/
                    {questions.length}
                  </div>
                  <div className="question-text">
                    {questions[currentQuestion].questionText}
                  </div>
                </div>
                <div className="answer-section">
                  {questions[currentQuestion].answerOptions.map(
                    (answerOption) => (
                      <button
                        onClick={() =>
                          handleAnswerOptionClick(answerOption.isCorrect)
                        }
                      >
                        {answerOption.answerText}
                      </button>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </>
    )
  );
}

export default Quiz;
