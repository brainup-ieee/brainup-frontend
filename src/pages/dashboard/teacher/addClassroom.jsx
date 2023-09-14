import { useState } from "react";
import { usePostMutate } from "../../../hooks/useFetch";
import { Input } from "../../../components/Input";
import { AddIcon } from "../../../components/icons/AddIcon";
import { CancelIcon } from "../../../components/icons/CancelIcon";

export const AddClassroomCard = ({ onAddClassroom }) => {
  const api = "https://brainup-api.mazenamir.com/api/classrooms/teacher/create";
  const auth = { Authorization: `Bearer ${localStorage.getItem("userToken")}` };
  const [add, setAdd] = useState(false);
  const [classroomName, setClassroomName] = useState("");
  const addClassRoom = usePostMutate(api, auth, { name: classroomName });

  const handleChange = (e) => {
    setClassroomName(e.target.value);
  };

  const handleAdd = async () => {
    const data = await addClassRoom.mutateAsync(api, auth, {
      name: classroomName,
    });
    const { classroom } = data;
    classroom.name = classroomName;
    onAddClassroom(classroom);
    setClassroomName("");
  };

  return (
    <div className="w-full h-60 bg-secondary rounded-2xl relative flex justify-center items-center">
      {add ? (
        <div className="px-4 flex flex-col">
          <Input
            text="Classroom Name"
            type="text"
            placeholder="Classroom Name"
            value={classroomName}
            change={handleChange}
          />
          <div className="flex items-center gap-4">
            <button
              className={
                "px-4 py-2 bg-primary text-white rounded-lg transition-colors duration-200 ease-cubic hover:bg-primary-light" +
                (addClassRoom.isLoading || classroomName.trim().length < 3
                  ? " bg-primary-light cursor-not-allowed"
                  : "")
              }
              onClick={handleAdd}
              disabled={
                addClassRoom.isLoading || classroomName.trim().length < 3
              }
            >
              <AddIcon className="w-5 h-5" />
            </button>
            <button
              className={
                "px-4 py-2 bg-[#fd4040] text-white rounded-lg transition-colors duration-200 ease-cubic hover:bg-[#fa6565]" +
                (addClassRoom.isLoading
                  ? " bg-[#fa6565] cursor-not-allowed"
                  : "")
              }
              onClick={() => setAdd(false)}
              disabled={addClassRoom.isLoading}
            >
              <CancelIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 cursor-pointer"
          onClick={() => setAdd(true)}
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-2 bg-primary rounded-full"></span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-12 bg-primary rounded-full"></span>
        </div>
      )}
    </div>
  );
};
