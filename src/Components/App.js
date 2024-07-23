import { useEffect, useReducer } from "react";
import DateCounter from "./DateCounter";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Nextbutton from "./Nextbutton";
import Prograss from "./Prograss";
import FinishedScreen from "./FinishedScreen";
import Timer from "./Timer";
import Footer from "./Footer";
import { useQuiz } from "../Context/QuizContext";

function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "finished" && <FinishedScreen />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Prograss />
            <Question />
            <Footer>
              <Nextbutton />
              <Timer />
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
