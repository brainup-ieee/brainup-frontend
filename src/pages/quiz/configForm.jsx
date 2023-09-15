import { useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizContext } from "../../contexts/quiz";
import { QuizInput } from "./quizInput";
import { QuizCheckbox } from "./QuizCheckbox";

const initialState = {
  title: "",
  time: 0,
  number_of_models: 1,
  number_of_questions: 1,
  number_of_choices: 2,
  active: 1,
  shuffle_questions: 0,
  instant_results: 0,
  results_pdf: 0,
};

const configReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_VALUE":
      return { ...state, [action.field]: action.value };
    case "SUBMIT_FORM":
      return state;
    default:
      return state;
  }
};

export const ConfigForm = () => {
  const { classroom, id } = useParams();
  const navigate = useNavigate();
  const { setQuiz } = useContext(QuizContext);
  const [state, dispatch] = useReducer(configReducer, initialState);

  useEffect(() => {
    const quizStorage = localStorage.getItem("quiz");
    if (quizStorage) {
      const { configs } = JSON.parse(quizStorage);
      for (const key in configs) {
        if (
          key === "active" ||
          key === "shuffle_questions" ||
          key === "instant_results" ||
          key === "results_pdf"
        ) {
          continue;
        }
        dispatch({ type: "CHANGE_VALUE", field: key, value: configs[key] });
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    dispatch({ type: "CHANGE_VALUE", field, value });
  };

  const handleCheckboxChange = (field, checked) => {
    dispatch({ type: "CHANGE_VALUE", field, value: checked ? 1 : 0 });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "SUBMIT_FORM" });
    const quizStorage = JSON.parse(localStorage.getItem("quiz"));
    quizStorage.configs = state;
    setQuiz(quizStorage);
    localStorage.setItem("quiz", JSON.stringify(quizStorage));
    navigate(`/${classroom}/${id}/quiz/model/create`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <QuizInput
        htmlFor="quiz-title"
        label="Quiz Title"
        type="text"
        placeholder="Quiz 1 - Atom structure"
        value={state.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
      />
      <div className="w-full flex items-center gap-8 mt-4">
        <QuizInput
          htmlFor="quiz-models"
          label="Number of Models"
          type="number"
          placeholder="2"
          value={state.number_of_models}
          onChange={(e) =>
            handleInputChange("number_of_models", parseInt(e.target.value))
          }
        />
        <QuizInput
          htmlFor="quiz-time"
          label="Time in Minutes"
          type="number"
          placeholder="15"
          value={state.time}
          onChange={(e) => handleInputChange("time", parseInt(e.target.value))}
        />
      </div>
      <div className="w-full flex items-center gap-8 mt-4">
        <QuizInput
          htmlFor="quiz-questions"
          label="Number of Questions"
          type="number"
          placeholder="3"
          value={state.number_of_questions}
          onChange={(e) =>
            handleInputChange("number_of_questions", parseInt(e.target.value))
          }
        />
        <QuizInput
          htmlFor="quiz-choices"
          label="Number of Choices"
          type="number"
          placeholder="4"
          value={state.number_of_choices}
          onChange={(e) =>
            handleInputChange("number_of_choices", parseInt(e.target.value))
          }
        />
      </div>
      <div className="w-full flex items-center justify-between gap-8 mt-4">
        <QuizCheckbox
          htmlFor="quiz-shuffle"
          className="justify-start"
          text="Shuffle Questions"
          checked={state.shuffle_questions}
          onChange={(e) =>
            handleCheckboxChange("shuffle_questions", e.target.checked)
          }
        />
        <QuizCheckbox
          htmlFor="quiz-active"
          className="justify-center"
          text="Active on Saving"
          checked={state.active}
          onChange={(e) => handleCheckboxChange("active", e.target.checked)}
        />
        <QuizCheckbox
          htmlFor="quiz-results"
          className="justify-end"
          text="Results Sent on Finish"
          checked={state.results_pdf}
          onChange={(e) =>
            handleCheckboxChange("results_pdf", e.target.checked)
          }
        />
      </div>
      <div className="w-full flex justify-center gap-8 mt-12">
        <button className="px-16 py-3 text-lg text-primary border-2 border-primary rounded-xl transition-colors duration-300 ease-cubic hover:text-white hover:bg-primary">
          Create
        </button>
      </div>
    </form>
  );
};
