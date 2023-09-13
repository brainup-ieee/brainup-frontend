import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SkeltonLoader } from "../../../components/SkeltonLoader";
import { useGet } from "../../../hooks/useFetch";
import { CreateClassroomCard } from "../../../components/CreateClassRoomCArd";
import { AddClassroomCard } from "./addClassroom";

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const { data, isLoading } = useGet(
    "https://brainup-api.mazenamir.com/api/classrooms/teacher/get",
    { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
  );
  const [classrooms, setClassrooms] = useState(
    isLoading ? [] : data.classrooms
  );

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

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Classrooms</h1>
      <div className="card-grid">
        <AddClassroomCard onAddClassroom={handleAddClassroom} />
        {isLoading ? (
          <>
            <SkeltonLoader />
            <SkeltonLoader />
            <SkeltonLoader />
            <SkeltonLoader />
          </>
        ) : (
          <>
            {classrooms.length === 0 ? (
              <>No Classrooms</>
            ) : (
              classrooms.map((classroom, i) => (
                <CreateClassroomCard
                  key={classroom.id}
                  classroom={classroom}
                  i={i}
                />
              ))
            )}
          </>
        )}
      </div>
    </main>
  );
};
