import React, { useEffect } from "react";
import { useQuiz } from "../Context/QuizContext";

function Timer() {
  const { secondRemaing, dispatch } = useQuiz();
  const mins = Math.floor(secondRemaing / 60);
  const sec = secondRemaing % 60;
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins <= 9 && "0"}
      {mins}: {sec <= 9 && "0"}
      {sec}
    </div>
  );
}

export default Timer;
