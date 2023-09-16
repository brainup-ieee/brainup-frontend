import { Link } from "react-router-dom";
import axios from "axios";
import { EditIcon } from "../../components/icons/EditIcon";
import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { useEffect, useState } from "react";

const Empty = ({ text }) => {
  return (
    <div className="mt-4">
      <p className="text-center">You have no {text} yet</p>
    </div>
  );
};

const Lessons = ({ list, classroomName, classroomID, handleDelete }) => {
  const handleDeleteRequest = (id) => {
    const url = `https://brainup-api.mazenamir.com/api/lessons/teacher/delete/${id}`;
    const header = {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    };
    axios
      .delete(url, {
        headers: header,
      })
      .then((res) => {
        handleDelete(list.filter((lesson) => lesson.id !== id));
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
              <Link
                to={`/${classroomName}/${classroomID}/${lesson.name}/${lesson.id}`}
              >
                <h2 className="text-lg font-semibold">{lesson.name}</h2>
              </Link>
              <div className="flex gap-4 text-sm">
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg">
                  <EditIcon className="w-4 h-4" />
                  <h4>Edit</h4>
                </button>
                <button
                  className="flex items-center gap-2 border-2 border-[#FF5555] text-[#FF5555] px-4 py-2 rounded-lg"
                  onClick={() => handleDeleteRequest(lesson.id)}
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
  const [stateList, setStateList] = useState([]);
  axios.get("https://brainup-api.mazenamir.com/api/quizes/teacher/get", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  }).then((res) => {
    const quizzes = res.data.data;
    setStateList(quizzes);
  });
  // console.log(stateList);
  useEffect(() => {
    // const quizzes = localStorage.getItem("quizzes");
    // if (quizzes) {
    //   setStateList(JSON.parse(quizzes));
    // }
  }, []);

  const handleDeleteRequest = (title) => {
    const newList = stateList.filter((quiz) => quiz.configs.title !== title);
    setStateList(newList);
    localStorage.setItem("quizzes", JSON.stringify(newList));
  };

  if (stateList.length < 1) {
    return <Empty text="quizzes" />;
  }

  return (
    <div className="flex justify-center my-8">
      <ul className="w-full max-w-5xl">
        {stateList.map((quiz) => {
          console.log(quiz);
          return (
            <li
              key={quiz.title}
              className="px-8 flex justify-between items-center pt-4 pb-2 border-b-2 border-b-gray-200"
            >
              <Link
                to={`/${classroomName}/${classroomID}/${quiz.name}/${quiz.id}`}
              >
                <h2>{quiz.title}</h2>
              </Link>
              <div className="flex gap-4 text-sm">
                <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg">
                  <EditIcon className="w-4 h-4" />
                  <h4>Edit</h4>
                </button>
                <button
                  className="flex items-center gap-2 border-2 border-[#FF5555] text-[#FF5555] px-4 py-2 rounded-lg"
                  onClick={() => handleDeleteRequest(quiz.title)}
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

export const ClassroomList = ({ list, classroomName, classroomID, type }) => {
  const [stateList, setStateList] = useState(list);

  useEffect(() => {
    setStateList(list);
  }, [list]);

  if (stateList.length < 1 && type !== "quizzes") {
    return <Empty text={type} />;
  }

  const handleDelete = (newList) => {
    setStateList(newList);
  };

  if (type === "lessons") {
    return (
      <Lessons
        list={stateList}
        classroomName={classroomName}
        classroomID={classroomID}
        handleDelete={handleDelete}
      />
    );
  } else if (type === "quizzes") {
    return (
      <Quizzes
        list={list}
        classroomName={classroomName}
        classroomID={classroomID}
        handleDelete={handleDelete}
      />
    );
  }
};
