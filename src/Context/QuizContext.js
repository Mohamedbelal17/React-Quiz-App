import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

function QuizProvider({ children }) {
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
  function reducer(state, action) {
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

  const [
    {
      questions,
      status,
      index,
      answer,
      highscore,
      secondRemaing,
      questionNum,
      points,
    },
    dispatch,
  ] = useReducer(reducer, initialstate);

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
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        highscore,
        secondRemaing,
        questionNum,
        total,
        handleStart,
        handleInput,
        points,
        dispatch,
        numQuestions,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("this Context used outside the QuizProvider");
  return context;
}

export { useQuiz, QuizProvider };
