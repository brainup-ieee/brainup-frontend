import { Link, useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { QuizContext, QuizContextProvider } from "../../contexts/quiz";
import { AIIcon } from "../../components/icons/AIIcon";
import { ConfigForm } from "./configForm";

export const QuizSchema = () => {
  const { classroom, id } = useParams();
  const navigate = useNavigate();
  const { setQuiz } = useContext(QuizContext);

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/signin");
    }

    const quizStorage = JSON.parse(localStorage.getItem("quiz"));
    quizStorage.classroom_id = id;
    setQuiz(quizStorage);
    localStorage.setItem("quiz", JSON.stringify(quizStorage));
  }, []);

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">{classroom} - Quiz creation</h1>
      <div className="w-full">
        <Link
          to="/teacher-dashboard"
          className="w-full flex items-center justify-center gap-4 px-4 py-2 text-white bg-primary rounded-xl transition-colors duration-300 ease-cubic hover:bg-primary-light"
        >
          <AIIcon className="w-6 h-6" />
          <h4>Create With AI</h4>
        </Link>
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
