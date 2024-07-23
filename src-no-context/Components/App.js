import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Nextbutton from "./Nextbutton";
import { type } from "@testing-library/user-event/dist/type";
import Prograss from "./Prograss";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";
const SEC = 30;

const initialstate = {
  questions: [],

  // "loading" ,"error" , "ready" , "active", "finished"
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondRemaing: null,
  questionNum: 15,
};
function reduce(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondRemaing: state.questions.length * SEC,
      };
    case "next":
      return { ...state, index: state.index + 1, answer: null };
    case "restart":
      return { ...state, index: 0, status: "ready", answer: null, points: 0 };
    case "input":
      return { ...state, questionNum: action.payload };
    case "timer":
      return {
        ...state,
        secondRemaing: state.secondRemaing - 1,
        status: state.secondRemaing === 0 ? "finished" : state.status,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points >= state.highscore ? state.points : state.highscore,
      };
    case "newanswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("Unknown actions");
  }
}

function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondRemaing,
      questionNum,
    },
    dispatch,
  ] = useReducer(reduce, initialstate);

  const numQuestions = questions.length;

  useEffect(function () {
    async function questionData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) {
          throw new Error("Something went wrong with fatching movies");
        }
        const data = await res.json();
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    questionData();
  }, []);

  function handleStart() {
    dispatch({ type: "start" });
  }

  function handleInput(e) {
    dispatch({ type: "input", payload: e });
  }

  const totalpoint = questions.reduce((prev, curr) => prev + curr.points, 0);
  const total = questions
    .slice(0, questionNum)
    .reduce((prev, curr) => prev + curr.points, 0);

  console.log(total);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "finished" && (
          <FinishedScreen
            points={points}
            max={total}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "ready" && (
          <StartScreen
            num={numQuestions}
            handleStart={handleStart}
            handleInput={handleInput}
            questionNum={questionNum}
          />
        )}
        {status === "active" && (
          <>
            <Prograss
              num={numQuestions}
              i={index}
              points={points}
              totalpoint={total}
              questionNum={questionNum}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <Footer>
              <Nextbutton
                dispatch={dispatch}
                answer={answer}
                index={index}
                max={numQuestions}
                questionNum={questionNum}
              />
              <Timer secondRemaing={secondRemaing} dispatch={dispatch} />
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
