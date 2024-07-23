import React from "react";
import { useQuiz } from "../Context/QuizContext";

function Prograss() {
  const { index, points, totalpoint, answer, questionNum } = useQuiz();
  const i = index;
  return (
    <header className="progress">
      <progress
        max={questionNum}
        value={i + Number(answer !== null)}
      ></progress>
      <p>
        Question <strong>{i + 1}</strong>/ {questionNum}
      </p>
      <p>
        Points <strong>{points}</strong>/ {totalpoint}
      </p>
    </header>
  );
}

export default Prograss;
