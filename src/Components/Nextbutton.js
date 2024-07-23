import { type } from "@testing-library/user-event/dist/type";
import React from "react";
import { useQuiz } from "../Context/QuizContext";

function Nextbutton() {
  const { dispatch, answer, index, numQuestions, questionNum } = useQuiz();
  // const max = numQuestions;
  // if (index < max - 1)
  if (index < Number(questionNum) - 1)
    return (
      <>
        {answer !== null ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "next" })}
          >
            Next
          </button>
        ) : (
          <></>
        )}
      </>
    );
  // if (index === max - 1)
  if (index === Number(questionNum) - 1)
    return (
      <>
        {answer !== null ? (
          <button
            className="btn btn-ui"
            onClick={() => dispatch({ type: "finished" })}
          >
            Finished
          </button>
        ) : (
          <></>
        )}
      </>
    );
}

export default Nextbutton;
