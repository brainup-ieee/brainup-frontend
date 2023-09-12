// components
import { Link } from "react-router-dom";
import { TeacherIcon } from "../../components/icons/Teacher";
import { StudentIcon } from "../../components/icons/Student";
import { CheckCircleIcon } from "../../components/icons/CheckCircle";
import { ButtonFull } from "../../components/ButtonFull";

export const RegisterToggle = ({
  personToggle,
  teacherRegister,
  studentRegister,
  onContinue,
}) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-nunito font-bold text-center">
        Welcome to BrainUp! Let us know who you are.
      </h2>
      <div className="flex justify-center items-center gap-4">
        <button
          className={
            "relative px-6 py-4 bg-transparent border-2 rounded-xl " +
            (personToggle === 1 ? "border-primary" : "border-black")
          }
          onClick={teacherRegister}
        >
          <div className="flex flex-col justify-center items-center">
            <TeacherIcon
              className={
                "w-16 h-16 " +
                (personToggle === 1 ? "fill-primary" : "fill-black")
              }
            />
            <p
              className={
                "text-xl font-nunito font-bold text-center " +
                (personToggle === 1 ? " text-primary" : "text-black")
              }
            >
              Teacher
            </p>
          </div>
          {personToggle === 1 && (
            <CheckCircleIcon className="absolute top-1 right-1 w-6 h-6 fill-primary" />
          )}
        </button>
        <button
          className={
            "relative px-6 py-4 bg-transparent border-2 rounded-xl " +
            (personToggle === 2 ? "border-primary" : "border-black")
          }
          onClick={studentRegister}
        >
          <div className="flex flex-col justify-center items-center">
            <StudentIcon
              className={
                "w-16 h-16 " +
                (personToggle === 2 ? "fill-primary" : "fill-black")
              }
            />
            <p
              className={
                "text-xl font-nunito font-bold text-center " +
                (personToggle === 2 ? " text-primary" : "text-black")
              }
            >
              Student
            </p>
          </div>
          {personToggle === 2 && (
            <CheckCircleIcon className="absolute top-1 right-1 w-6 h-6 fill-primary" />
          )}
        </button>
      </div>
      <div className="w-full px-6">
        <ButtonFull
          text="Continue"
          enabled={personToggle === 1 || personToggle === 2}
          clickHandler={onContinue}
        />
      </div>
      <div>
        <p className="text-center text-gray-500 font-nunito select-none">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-primary font-bold"
            onClick={() => {
              localStorage.removeItem("userRegisterData");
            }}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
