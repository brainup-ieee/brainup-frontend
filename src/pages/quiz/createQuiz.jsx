import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { QuizContext, QuizContextProvider } from "../../contexts/quiz";
import { AIIcon } from "../../components/icons/AIIcon";
import { ConfigForm } from "./configForm";
import { Loader } from "../../components/Loader";

const AI_STATE = {
  AI: true,
  configs: {
    title: "Quiz 1 - Atom structure",
    time: 15,
    number_of_models: 1,
    number_of_questions: 3,
    number_of_choices: 4,
    active: 1,
    shuffle_questions: 1,
    instant_results: 0,
    results_pdf: 0,
  },
  questions: [
    [
      {
        question: "The atom is made up of?",
        answer: "All of the above",
        mark: 3,
        choices: {
          0: "Protons",
          1: "Neutrons",
          2: "Electrons",
          3: "All of the above",
        },
      },
      {
        question:
          "What is the materials that do NOT allow  electrons to flow through them easily?",
        answer: "Insulators",
        mark: 3,
        choices: {
          0: "Insulators",
          1: "Conductors",
          2: "Semiconductors",
          3: "Superconductors",
        },
      },
      {
        question:
          "What causes objects to become charged with static electricity?",
        answer: "The friction or rubbing of objects.",
        mark: 3,
        choices: {
          0: "The flow of electrons from one object to another.",
          1: "The exchange of protons between objects.",
          2: "The friction or rubbing of objects.",
          3: "The release of thermal energy.",
        },
      },
    ],
  ],
};

export const QuizSchema = () => {
  const { classroom, id } = useParams();
  const navigate = useNavigate();
  const { quiz, setQuiz } = useContext(QuizContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/signin");
    }

    const quizStorage = localStorage.getItem("quiz");
    if (!quizStorage) {
      localStorage.setItem(
        "quiz",
        JSON.stringify({
          ...quiz,
          classroom_id: id,
        })
      );
    } else {
      setQuiz(JSON.parse(quizStorage));
    }
  }, []);

  const handleAI = () => {
    const quizStorage = JSON.parse(localStorage.getItem("quiz"));
    quizStorage.AI = true;
    quizStorage.configs = AI_STATE.configs;
    quizStorage.questions = AI_STATE.questions;
    setQuiz(quizStorage);
    localStorage.setItem("quiz", JSON.stringify(quizStorage));
    setIsLoading(true);
    const timer = setTimeout(() => {
      navigate(`/${classroom}/${id}/quiz/model/create`);
      setIsLoading(false);
      clearTimeout(timer);
    }, 3000);
  };

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">{classroom} - Quiz creation</h1>
      <div className="w-full">
        <button
          onClick={handleAI}
          className="w-full flex items-center justify-center gap-4 px-4 py-2 text-white bg-primary rounded-xl transition-colors duration-300 ease-cubic hover:bg-primary-light"
        >
          {isLoading ? (
            <div className="w-6 h-6">
              <Loader />
            </div>
          ) : (
            <AIIcon className="w-6 h-6" />
          )}
          <h4>Create With AI</h4>
        </button>
      </div>
      <ConfigForm />
    </main>
  );
};

export const CreateQuiz = () => {
  return (
    <QuizContextProvider>
      <QuizSchema />
    </QuizContextProvider>
  );
};
