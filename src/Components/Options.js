import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useQuiz } from "../Context/QuizContext";

function Options() {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];
  const hasanswer = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasanswer
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasanswer}
          onClick={() => dispatch({ type: "newanswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
