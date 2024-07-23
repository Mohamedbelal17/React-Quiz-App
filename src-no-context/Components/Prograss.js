import React from "react";

function Prograss({ num, i, points, totalpoint, answer, questionNum }) {
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
