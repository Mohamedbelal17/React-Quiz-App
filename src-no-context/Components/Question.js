import React from "react";
import Options from "./Options";
import { type } from "@testing-library/user-event/dist/type";

function Question({ question, dispatch, answer, points }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
