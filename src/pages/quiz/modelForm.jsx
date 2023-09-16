import { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { QuizContext } from "../../contexts/quiz";
import { QuizInput } from "./quizInput";
import { usePostMutate } from "../../hooks/useFetch";

const arrayFrom = (length) => Array.from({ length }, (_, i) => i + 1);

const helperFunction = (questions, choices) => {
  const array = [],
    choicesObj = {};
  for (let i = 0; i < choices; i++) {
    choicesObj[i] = "";
  }
  for (let i = 0; i < questions; i++) {
    array.push({
      question: "",
      answer: "",
      mark: 1,
      choices: { ...choicesObj },
    });
  }
  return array;
};

const reducer = (state, action) => {
  const { questionIndex, field, value } = action.payload;
  switch (action.type) {
    case "SET_STATE":
      return action.payload;
    case "QUESTION_CHANGE":
      const updatedQuestions = [...state];
      updatedQuestions[questionIndex][field] = value;
      return updatedQuestions;
    case "CHOICE_CHANGE":
      const updatedChoices = [...state];
      updatedChoices[questionIndex]["choices"][field] = value;
      return updatedChoices;
    default:
      return state;
  }
};

export const ModelForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { quiz, setQuiz } = useContext(QuizContext);
  const number_of_questions = arrayFrom(quiz.configs.number_of_questions);
  const number_of_choices = arrayFrom(quiz.configs.number_of_choices);
  const [state, dispatch] = useReducer(reducer, []);
  const [isLoading, setIsLoading] = useState(false);
  const url = "https://brainup-api.mazenamir.com/api/quizes/teacher/create";
  const header = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };
  const addQuiz = usePostMutate(url, header, {
    configs: quiz.configs,
    classroom_id: quiz.classroom_id,
    questions: [[...state]],
  });

  useEffect(() => {
    if (quiz.AI) {
      dispatch({ type: "SET_STATE", payload: [...quiz.questions[0]] });
    } else {
      const newState = helperFunction(
        quiz.configs.number_of_questions,
        quiz.configs.number_of_choices
      );
      dispatch({ type: "SET_STATE", payload: [...newState] });
    }
  }, [quiz]);

  if (number_of_questions.length < 1 || state.length < 1) {
    return <h1>Carregando...</h1>;
  }

  if (number_of_questions.length !== state.length) {
    return <h1>Loading...</h1>;
  }

  const handleQuestionChange = (questionIndex, field, value) => {
    dispatch({
      type: "QUESTION_CHANGE",
      payload: { questionIndex, field, value },
    });
  };

  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const field = choiceIndex;
    dispatch({
      type: "CHOICE_CHANGE",
      payload: { questionIndex, field, value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const quizData = {
      configs: quiz.configs,
      classroom_id: quiz.classroom_id,
      questions: [[...state]],
    };

    console.log(quizData);
    const quizzes = localStorage.getItem("quizzes");
    if (quizzes) {
      const parsedQuizzes = JSON.parse(quizzes);
      parsedQuizzes.push(quizData);
      localStorage.setItem("quizzes", JSON.stringify(parsedQuizzes));
    } else {
      localStorage.setItem("quizzes", JSON.stringify([quizData]));
    }
    localStorage.removeItem("quiz");
    const timer = setTimeout(() => {
      navigate(`/teacher/classroom/${id}`);
      setIsLoading(false);
      clearTimeout(timer);
    }, 1000);
    // const data = await addQuiz.mutateAsync(url, header, quizData);
    // console.log(data);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    localStorage.removeItem("quiz");
    navigate(`/teacher/classroom/${id}`);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {number_of_questions.map((index) => (
        <div
          key={index}
          className="border-2 border-gray-200 rounded-xl overflow-hidden"
        >
          <h2 className="px-4 py-2 font-medium text-xl bg-gray-100">
            Question {index}
          </h2>
          <div className="p-4">
            <QuizInput
              htmlFor={"question" + index}
              label=""
              type="text"
              placeholder="Add your question here"
              value={state[index - 1]["question"]}
              onChange={(e) =>
                handleQuestionChange(index - 1, "question", e.target.value)
              }
            />
            <div className="mt-4">
              <h4>Choices</h4>
              <div className="grid grid-cols-2 gap-4">
                {number_of_choices.map((choiceIndex) => (
                  <QuizInput
                    key={choiceIndex}
                    htmlFor={`question${index}-choice${choiceIndex}`}
                    label=""
                    type="text"
                    placeholder={`Choice ${choiceIndex}`}
                    value={state[index - 1]["choices"][choiceIndex - 1]}
                    onChange={(e) => {
                      handleChoiceChange(
                        index - 1,
                        choiceIndex - 1,
                        e.target.value
                      );
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 w-full flex items-center gap-4">
              <QuizInput
                htmlFor={`question${index}-mark`}
                label="Question Mark"
                type="number"
                placeholder="Mark"
                value={state[index - 1]["mark"]}
                onChange={(e) => {
                  handleQuestionChange(index - 1, "mark", e.target.value);
                }}
              />
              <QuizInput
                htmlFor={`question${index}-answer`}
                label="Question Answer"
                type="text"
                placeholder="Answer"
                value={state[index - 1]["answer"]}
                onChange={(e) => {
                  handleQuestionChange(index - 1, "answer", e.target.value);
                }}
              />
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-4">
        <button
          className="px-8 py-2 text-lg text-primary font-semibold border-2 border-primary rounded-xl transition-colors duration-300 ease-cubic hover:text-white hover:bg-primary"
          type="submit"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
        <button
          className="px-8 py-2 text-lg text-[#FF5555] font-semibold border-2 border-[#FF5555] rounded-xl transition-colors duration-300 ease-cubic hover:text-white hover:bg-[#FF5555]"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};
