import { ListContainer } from "../../components/listContainer";
import { Button } from "../../components/Button";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import { SkeltonLoader } from "../../components/skeltonLoader";

const fetchClassrooms = async () => {
  // headers for authorization
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  };
  return await axios
    .get("https://brainup-api.mazenamir.com/api/classrooms/teacher/get", {
      headers,
    })
    .then((res) => res.data);
};

export const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const { data: classrooms, isLoading } = useQuery(
    "classrooms",
    fetchClassrooms
  );

  console.log(isLoading, classrooms);

  useEffect(() => {
    const isUserTokenExist = localStorage.getItem("userToken");
    if (isUserTokenExist) {
      setUserToken(isUserTokenExist);
    } else {
      navigate("/signin");
    }
  }, []);

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">Classrooms</h1>
      <div className="card-grid">
        <div
          className="w-full h-60 bg-secondary rounded-xl relative cursor-pointer"
          onClick={() => navigate("/dashboard/teacher/create-classroom")}
        >
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-2 bg-primary rounded-full"></span>
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-1/4 bg-primary rounded-full"></span>
        </div>
        {isLoading ? (
          <>
            <SkeltonLoader />
            <SkeltonLoader />
            <SkeltonLoader />
            <SkeltonLoader />
          </>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
};
