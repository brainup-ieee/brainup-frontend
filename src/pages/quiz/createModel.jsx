import { QuizContext, QuizContextProvider } from "../../contexts/quiz";
import { useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ModelSchema = () => {
  const { classroom, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("userToken")) {
      navigate("/signin");
      return;
    }
  }, []);
  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">{classroom} - Question Model</h1>
    </main>
  );
};

export const CreateModel = () => {
  return (
    <QuizContextProvider>
      <ModelSchema />
    </QuizContextProvider>
  );
};
