import { Link } from "react-router-dom";
import axios from "axios";
import { EditIcon } from "../../components/icons/EditIcon";
import { DeleteIcon } from "../../components/icons/DeleteIcon";

const Empty = ({ text }) => {
  return (
    <div className="mt-4">
      <p className="text-center">You have no {text} yet</p>
    </div>
  );
};

const Lessons = ({ list, classroomName, classroomID }) => {
  const handleDelete = (id) => {
    const url = `https://brainup-api.mazenamir.com/api/lessons/teacher/delete/${id}`;

    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.response) {
          // The request was made, but the server responded with an error status.
          console.error(
            "Request failed with status code:",
            err.response.status
          );
          // You can also log the response data for further analysis:
          console.error("Response data:", err.response.data);
        } else {
          // The request was not made. This could be a network error.
          console.error("Request error:", err.message);
        }
      });
  };

  return (
    <div className="flex justify-center my-8">
      <ul className="w-full max-w-5xl">
        {list.map((lesson) => {
          return (
            <li
              key={lesson.id}
              className="px-8 flex justify-between items-center pt-4 pb-2 border-b-2 border-b-gray-200"
            >
              <Link to={`/${classroomName}/${classroomID}/lesson/${lesson.id}`}>
                <h2 className="text-lg font-semibold">{lesson.name}</h2>
              </Link>
              <div className="flex gap-4 text-sm">
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg">
                  <EditIcon className="w-4 h-4" />
                  <h4>Edit</h4>
                </button>
                <button
                  className="flex items-center gap-2 border-2 border-[#FF5555] text-[#FF5555] px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(lesson.id)}
                >
                  <DeleteIcon className="w-4 h-4" />
                  <h4>Delete</h4>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Quizzes = ({ list, classroomName, classroomID }) => {
  return (
    <ul>
      {list.map((lesson) => {
        <></>;
      })}
    </ul>
  );
};

export const ClassroomList = ({ list, classroomName, classroomID, type }) => {
  if (list.length < 1) {
    return <Empty text={type} />;
  }

  if (type === "lessons") {
    return (
      <Lessons
        list={list}
        classroomName={classroomName}
        classroomID={classroomID}
      />
    );
  } else if (type === "quizzes") {
    return (
      <Quizzes
        list={list}
        classroomName={classroomName}
        classroomID={classroomID}
      />
    );
  }
};