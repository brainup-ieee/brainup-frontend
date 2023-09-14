import { Link } from "react-router-dom";

const Empty = ({ text }) => {
  return (
    <div className="mt-4">
      <p className="text-center">You have no {text} yet</p>
    </div>
  );
};

const Lessons = ({ list }) => {
  return (
    <div className="flex justify-center my-8">
      <ul className="w-full max-w-5xl">
        {list.map((lesson) => {
          return (
            <li
              key={lesson.id}
              className="px-8 flex justify-between items-center pb-2 border-b-2 border-b-gray-200"
            >
              <Link to={`/classroom/${lesson.id}/lesson`}>
                <h2 className="text-lg font-semibold">{lesson.name}</h2>
              </Link>
              <div className="flex gap-4">
                <button className="text-primary">Edit</button>
                <button className="text-red-500">Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Quizzes = ({ list }) => {
  return (
    <ul>
      {list.map((lesson) => {
        <></>;
      })}
    </ul>
  );
};

export const ClassroomList = ({ list, type }) => {
  if (list.length < 1) {
    return <Empty text={type} />;
  }

  if (type === "lessons") {
    return <Lessons list={list} />;
  } else if (type === "quizzes") {
    return <Quizzes list={list} />;
  }
};
