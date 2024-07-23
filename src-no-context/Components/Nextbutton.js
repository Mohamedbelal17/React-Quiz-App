import { type } from "@testing-library/user-event/dist/type";
import React from "react";

function Nextbutton({ dispatch, answer, index, max, questionNum }) {
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
