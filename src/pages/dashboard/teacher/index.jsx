import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SkeltonLoader } from "../../../components/SkeltonLoader";
import { useGet } from "../../../hooks/useFetch";
import { CreateClassroomCard } from "../../../components/CreateClassRoomCard";
import { AddClassroomCard } from "./addClassroom";
import axios from "axios";

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [, setUserToken] = useState(null);
  const url = "https://brainup-api.mazenamir.com/api/classrooms/teacher/get";
  const header = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };
  const { data, isLoading, isError, isSuccess, refetch } = useGet(url, header);
  const [classrooms, setClassrooms] = useState([]);

  const handleAddClassroom = (newClassroom) => {
    setClassrooms((prevClassrooms) => [...prevClassrooms, newClassroom]);
  };

  useEffect(() => {
    const isUserTokenExist = localStorage.getItem("userToken");
    if (isUserTokenExist) {
      setUserToken(isUserTokenExist);
    } else {
      navigate("/signin");
    }

    if (!isLoading) setClassrooms(data.classrooms);
  }, [data]);

  const handleDelete = async (id) => {
    const url = `https://brainup-api.mazenamir.com/api/classrooms/teacher/delete/${id}`;
    const res = await axios.delete(url, {
      headers: header,
    });

    if (res.data.status === "success") {
      setClassrooms((prevClassrooms) =>
        prevClassrooms.filter((classroom) => classroom.id !== id)
      );
      refetch();
    }
  };

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Classrooms</h1>
      <div className="card-grid">
        <AddClassroomCard onAddClassroom={handleAddClassroom} />
        {isLoading && (
          <>
            <SkeltonLoader />
            <SkeltonLoader />
            <SkeltonLoader />
            <SkeltonLoader />
          </>
        )}
        {isError && <h2 className="text-2xl">Something went wrong</h2>}
        {isSuccess && classrooms.length > 0 && (
          <>
            {classrooms.map((classroom, i) => (
              <CreateClassroomCard
                key={classroom.id}
                classroom={classroom}
                i={i}
                onDelete={handleDelete}
              />
            ))}
          </>
        )}
      </div>
    </main>
  );
};
