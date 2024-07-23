import { type } from "@testing-library/user-event/dist/type";
import React, { useReducer } from "react";

function CHALLENGE() {
  const initialstate = {
    open: false,
    balance: 0,
    loan: 0,
    request: null,
  };

  function reduce(state, action) {
    switch (action.type) {
      case "open":
        return { ...state, open: true, balance: 500 };
      case "deposit":
        return { ...state, balance: state.balance + 150 };
      case "draw":
        return { ...state, balance: state.balance - 50 };
      case "close":
        return {
          ...state,
          balance: state.loan === 0 && state.balance == 0 ? 0 : state.balance,
          loan: state.loan === 0 && state.balance == 0 ? 0 : state.loan,
          open: state.loan === 0 && state.balance == 0 ? false : state.open,
          request:
            state.loan === 0 && state.balance == 0 ? null : state.request,
        };
      case "payloan":
        return {
          ...state,
          balance:
            state.balance >= state.loan
              ? state.balance - state.loan
              : state.balance,
          loan: state.balance >= state.loan ? 0 : state.loan,
        };
      case "req":
        return {
          ...state,
          request: 1,
          loan: state.request ? state.loan : 5000,
          balance: state.request ? state.balance : state.balance + 5000,
        };
      default:
        throw new Error("Unknow Action");
    }
  }

  const [{ open, balance, loan, request }, dispatch] = useReducer(
    reduce,
    initialstate
  );

  return (
    <div className="first">
      <h2>userReducer Bank Account</h2>
      <h3>Balance: {balance}</h3>
      <h3>loan: {loan}</h3>
      {!open && (
        <button
          className="btn btn-t"
          onClick={() => dispatch({ type: "open" })}
        >
          Open account
        </button>
      )}
      {open && (
        <>
          <button
            className="btn btn-t"
            onClick={() => dispatch({ type: "deposit" })}
          >
            Deposit 150
          </button>
          <button
            className="btn btn-t"
            onClick={() => dispatch({ type: "draw" })}
          >
            Withdraw 50
          </button>
          <button
            className="btn btn-t"
            onClick={() => dispatch({ type: "req" })}
          >
            Request a loan of 5000
          </button>
          <button
            className="btn btn-t"
            onClick={() => dispatch({ type: "payloan" })}
          >
            Pay loan
          </button>
          <button
            className="btn btn-t"
            onClick={() => dispatch({ type: "close" })}
          >
            Close account
          </button>
        </>
      )}
    </div>
  );
}

export default CHALLENGE;
