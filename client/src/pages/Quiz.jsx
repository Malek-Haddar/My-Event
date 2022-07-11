import { columnSelectionComplete } from "@syncfusion/ej2-react-grids";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Spinner from "../components/Spinner";
import { getQuizzes, reset } from "../features/quiz/quizSlice";
import { getUserSession } from "../features/sessions/sessionSlice";

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [questionss, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { userSession } = useSelector((state) => state.sessions);
  const { quizzes, isLoading, isError, message } = useSelector(
    (state) => state.quizzes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    // if (!user || !userSession[0]?.category) {
    //   navigate("/");
    // }

    dispatch(getUserSession());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);
  console.log({ userSession });

  // if (isLoading) {
  //   return <Spinner />;
  // }
  // const questionz = (e) => {
  //   const sessions = userSession[0]?.category[0]?.sessions;
  //   for (let i = 0; i < sessions.length; i++) {
  //     if (sessions[i]._id === e) {
  //       console.log("quizz ", sessions[i]);

  //       setQuestions(sessions[i].quiz);
  //     }
  //   }
  // };

  const questionz = (e) => {
    const sessions = userSession[0]?.category[0]?.sessions;
    for (let i = 0; i < sessions.length; i++) {
      if (sessions[i]._id === e) {
        console.log("quizz ", sessions[i]);
        setQuestions(sessions[i].quiz);
      }
    }
  };
  console.log({ questionss });

  const questions = questionss.map((question) => ({
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
      <section className="flex item-center justify-center w-full">
        <select
          className="text-pink-600 border-1 rounded-md text-center"
          onChange={(e) => {
            console.log(e.target.value);
            questionz(e.target.value);
          }}
        >
          <option value="">-Select-</option>
          {userSession[0]?.category[0]?.sessions.map((session) => (
            <option key={session._id} value={session._id}>
              {session.name}
            </option>
          ))}
        </select>
      </section>
      {questionss.length > 0 ? (
        <section className="d-flex justify-center  my-20  ">
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
                <div className="answer-section space-y-4">
                  {questions[currentQuestion].answerOptions.map(
                    (answerOption) => (
                      <button
                        className="rounded-md border-1 border-slate-600  hover:drop-shadow-xl hover:text-pink-600
                        hover:bg-light-gray "
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
      ) : (
        <div className="flex  justify-center my-20 ">
          <div className="  app">
            <div className="score-section text-center">
              No Quiz Available Now <br /> For this Session{" "}
            </div>
          </div>
        </div>
      )}
      {/* <section className="d-flex justify-content-center my-36 ">
        <div className="app">
          {showScore ? (
            <div className="score-section">
              You scored {score} out of {questionss.length}
            </div>
          ) : (
            <>
              <div className="question-section">
                <div className="question-count">
                  <span>Question {currentQuestion + 1}</span>/
                  {questionss.length}
                </div>
                <div className="question-text">
                  {questionss[currentQuestion]?.description}
                </div>
              </div>
              <div className="answer-section">
              {questionss.length > 0
                  ? questionss[currentQuestion]?.alternatives.map(
                      (answerOption) => (
                        <button
                        className="rounded-md border-1 border-slate-600"
                        onClick={() =>
                            handleAnswerOptionClick(answerOption.isCorrect)
                          }
                          >
                          {answerOption.text}
                        </button>
                      )
                    )
                  : "No Quiz Available Yet"}
                  </div>
            </>
          )}
        </div>
      </section> */}
      <Footer />
    </>
  );
}

export default Quiz;
