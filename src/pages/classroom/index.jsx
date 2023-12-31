import { useParams, useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { ClassroomLoader } from "../../components/ClassroomLoader";
import { AddIcon } from "../../components/icons/AddIcon";
import { ClassroomList } from "./classroomList";

const AddButton = ({ text, flag, id, classroomName }) => {
  const navigate = useNavigate();

  const handleAdd = () => {
    if (localStorage.getItem("quiz")) {
      localStorage.removeItem("quiz");
    }
    if (flag === "lessons") {
      navigate(`/${classroomName}/${id}/lesson/create`);
    } else {
      navigate(`/${classroomName}/${id}/quiz/create`);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <button
        className="bg-primary w-fit px-4 py-2 rounded-lg flex items-center gap-4 text-white"
        onClick={handleAdd}
      >
        <AddIcon className="w-4 h-4" />
        <div>{text}</div>
      </button>
    </div>
  );
};

const ClassroomBody = ({ classroom }) => {
  const [activeTab, setActiveTab] = useState("lessons");

  useEffect(() => {
    const active = localStorage.getItem("activeTab");
    if (active) {
      setActiveTab(active);
    }
  }, []);

  const handleTabChange = (e) => {
    const tab = e.target.textContent.toLowerCase();
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };

  return (
    <>
      <h1 className="text-2xl font-semibold">{classroom.name} Classroom</h1>
      <div className="flex justify-center w-full">
        <div className="border-2 border-[#FFE0A4] w-80 h-14 rounded-lg relative flex p-1 text-lg font-bold">
          <div
            className={
              "bg-[#FFE0A4] absolute w-1/2 h-11 rounded z-0 transition-all duration-300 ease-cubic" +
              (activeTab === "lessons" ? " left-1" : " left-[calc(50%-4px)]")
            }
          ></div>
          <button className="basis-1/2 rounded z-10" onClick={handleTabChange}>
            Lessons
          </button>
          <button className="basis-1/2 rounded z-10" onClick={handleTabChange}>
            Quizzes
          </button>
        </div>
      </div>
      {activeTab === "lessons" ? (
        <ClassroomList
          list={classroom.lessons}
          classroomName={classroom.name}
          classroomID={classroom.id}
          type="lessons"
        />
      ) : (
        <ClassroomList
          list={[]}
          classroomName={classroom.name}
          classroomID={classroom.id}
          type="quizzes"
        />
      )}
      <AddButton
        text={`Add ${activeTab}`}
        flag={activeTab}
        id={classroom.id}
        classroomName={classroom.name}
      />
    </>
  );
};

export const Classroom = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const url = `https://brainup-api.mazenamir.com/api/classrooms/teacher/get/${id}`;
  const auth = { Authorization: `Bearer ${localStorage.getItem("userToken")}` };
  const { data, isLoading, refetch } = useGet(url, auth);

  useEffect(() => {
    const isUserTokenExist = localStorage.getItem("userToken");
    if (!isUserTokenExist) {
      navigate("/signin");
    }
    refetch();
  }, [navigate]);

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      {isLoading ? (
        <ClassroomLoader />
      ) : (
        <ClassroomBody classroom={data.classroom} />
      )}
    </main>
  );
};
