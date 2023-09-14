import { useParams, useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useFetch";
import { useEffect } from "react";
import { ClassroomLoader } from "../../components/ClassroomLoader";

export const Classroom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `https://brainup-api.mazenamir.com/api/classrooms/teacher/get/${id}`;
  const auth = { Authorization: `Bearer ${localStorage.getItem("userToken")}` };
  const { data, isLoading } = useGet(url, auth);
  console.log(data);

  useEffect(() => {
    const isUserTokenExist = localStorage.getItem("userToken");
    if (!isUserTokenExist) {
      navigate("/signin");
    }
  }, []);

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      {isLoading ? (
        <ClassroomLoader />
      ) : (
        <h1 className="text-2xl font-semibold">
          {data.classroom.name} Classroom
        </h1>
      )}
    </main>
  );
};
