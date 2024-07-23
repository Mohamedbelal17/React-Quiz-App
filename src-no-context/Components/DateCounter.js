import { type } from "@testing-library/user-event/dist/type";
import { act, useReducer, useState } from "react";

function DateCounter() {
  // const [count, setCount] = useState(0);
  const initialstate = { count: 0, step: 1 };

  function reduce(state, action) {
    switch (action.type) {
      case "dec":
        return { ...state, count: state.count - state.step };
      case "inc":
        return { ...state, count: state.count + state.step };
      case "defineCount":
        return { ...state, count: action.payload };
      case "reset":
        return initialstate;
      case "defineStep":
        return { ...state, step: action.payload };

      default:
        throw new Error("Unknown Action");
    }
  }

  const [state, dispatch] = useReducer(reduce, initialstate);

  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount((count) => count - step);

    dispatch({ type: "dec" });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));

    dispatch({ type: "defineCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: "defineStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) =>
            dispatch({ type: "defineStep", payload: Number(e.target.value) })
          }
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
        <input
          value={count}
          onChange={(e) =>
            dispatch({ type: "defineCount", payload: Number(e.target.value) })
          }
        />
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
