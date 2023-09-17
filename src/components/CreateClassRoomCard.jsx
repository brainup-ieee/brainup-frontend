import { Link, useNavigate } from "react-router-dom";
import { CopyIcon } from "./icons/CopyIcon";

const CARD_COLORS = ["#fbd58c", "#5a5399", "#f9c052", "#9894c0"];

export const CreateClassroomCard = ({ classroom, i, onDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = (id) => {
    navigate(`/teacher/classroom/${id}`);
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
  };
  return (
    <div
      className="w-full h-60 p-4 rounded-2xl flex flex-col justify-end gap-8"
      style={{ backgroundColor: CARD_COLORS[i % 4] }}
    >
      <div className="mb-auto w-full flex items-center justify-between">
        <button
          role="delete"
          className="text-black text-2xl font-semibold"
          onClick={() => onDelete(classroom.id)}
        >
          x
        </button>
        <Link
          to={`/${classroom.name}/requests/${classroom.id}`}
          className="font-semibold"
        >
          requests
        </Link>
      </div>
      <h2
        className="text-3xl font-semibold font-nunito cursor-pointer"
        onClick={() => handleNavigate(classroom.id)}
      >
        {classroom.name}
      </h2>
      <div className="bg-white w-full h-8 rounded-full flex justify-between items-center px-3 text-sm">
        <h4>{classroom.code}</h4>
        <div onClick={() => handleCopy(classroom.code)}>
          <CopyIcon className="w-3 h-4 ml-2 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
