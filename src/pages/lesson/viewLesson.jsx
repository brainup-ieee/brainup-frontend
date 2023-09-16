import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGet } from "../../hooks/useFetch";

export const ViewLesson = () => {
  const { classroom, classroom_id, lesson, id } = useParams();
  const url = `https://brainup-api.mazenamir.com/api/lessons/teacher/get/${classroom_id}`;
  const auth = { Authorization: `Bearer ${localStorage.getItem("userToken")}` };
  const { data, isLoading } = useGet(url, auth);
  const [lessonData, setLessonData] = useState({});

  useEffect(() => {
    const isUserTokenExist = localStorage.getItem("userToken");
    if (!isUserTokenExist) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (data && data.status === "success") {
      const lesson = data.lessons.find((lesson) => lesson.id == id);
      setLessonData(lesson);
      console.log(lesson);
    }
  }, [data]);

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">
        {classroom} - {lesson}
      </h1>
      {
        isLoading? (
          <h2>Loading...</h2>
        ): (<></>)
      }
    </main>
  );
};
