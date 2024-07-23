import React from "react";
import { useQuiz } from "../Context/QuizContext";

function StartScreen() {
  const { handleStart, handleInput, questionNum } = useQuiz();
  return (
    <div className="start">
      <h2>Welcone to The React Quize!</h2>
      <h3>Please Enter the Number of Questions</h3>
      {/* <input
        type="number"
        max={num}
        value={questionNum}
        onChange={(e) => handleInput(e.target.value)}
      ></input> */}
      <h3>{questionNum} questions to test your react mastery</h3>

      <button className="btn btn-ui " onClick={() => handleStart()}>
        Let's start!
      </button>
    </div>
  );
}

export default StartScreen;
