import { createContext, useState, useEffect } from "react";

const INITIAL_STATE = {
  configs: {
    time: 0,
    number_of_models: 1,
    number_of_questions: 1,
    number_of_choices: 1,
    active: 1,
    shuffle_questions: 0,
    instant_results: 1,
    results_pdf: 1,
  },
  classroom_id: null,
  questions: [],
};

export const QuizContext = createContext();

export const QuizContextProvider = ({ children }) => {
  const [quiz, setQuiz] = useState(INITIAL_STATE);

  useEffect(() => {
    const quizStorage = localStorage.getItem("quiz");
    if (quizStorage) {
      setQuiz(JSON.parse(quizStorage));
    } else {
      localStorage.setItem("quiz", JSON.stringify(quiz));
    }
  }, []);

  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
