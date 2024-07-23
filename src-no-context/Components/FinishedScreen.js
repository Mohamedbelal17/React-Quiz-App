import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function FinishedScreen({ points, max, highscore, dispatch }) {
  const pre = (points / max) * 100;

  let emj;

  if (pre == 100) emj = "🥇";

  if (pre > 80 && pre < 100) emj = "🎉";
  if (pre == 50 && pre < 80) emj = "😑";
  if (pre >= 0 && pre < 50) emj = "🤔";
  if (pre == 0) emj = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emj} </span>Your Scored <strong>{points}</strong> out of {max} (
        {Math.ceil(pre)}
        %)
      </p>
      <p className="highscore">(High Score: {highscore})</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishedScreen;
