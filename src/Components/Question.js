import React from "react";
import Options from "./Options";
// import { type } from "@testing-library/user-event/dist/type";
import { useQuiz } from "../Context/QuizContext";

function Question() {
  const { questions, dispatch, answer, index } = useQuiz();

  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
