import { useParams, useNavigate } from "react-router-dom";
import { useGet } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

export const ClassroomRequests = () => {
  const { classroom, id } = useParams();
  const navigate = useNavigate();
  const url = `https://brainup-api.mazenamir.com/api/classrooms/teacher/get/${id}`;
  const auth = { Authorization: `Bearer ${localStorage.getItem("userToken")}` };
  const { data, isLoading, isError, refetch, isSuccess } = useGet(url, auth);
  const [requests, setRequests] = useState([]);
  const [requestLoading, setRequestLoading] = useState(false);

  useEffect(() => {
    const isUserTokenExist = localStorage.getItem("userToken");
    if (!isUserTokenExist) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (isSuccess) setRequests(data.classroom.requests);
  }, [data]);

  const handleApprove = async (id) => {
    setRequestLoading(true);
    const url =
      "https://brainup-api.mazenamir.com/api/classrooms/teacher/approve";
    const res = await axios.post(url, { request_id: id }, { headers: auth });
    if (res.data.status === "success") {
      setRequests(requests.filter((request) => request.id !== id));
      refetch();
    } else {
      console.log(res.data);
    }
    setRequestLoading(false);
  };

  const handleReject = async (id) => {
    setRequestLoading(true);
    const url =
      "https://brainup-api.mazenamir.com/api/classrooms/teacher/reject";
    const res = await axios.post(url, { request_id: id }, { headers: auth });
    if (res.data.status === "success") {
      setRequests(requests.filter((request) => request.id !== id));
      refetch();
    } else {
      console.log(res.data);
    }
    setRequestLoading(false);
  };

  return (
    <main className="mt-4 flex flex-col gap-4 pb-4">
      <h1 className="text-2xl font-semibold">{classroom} Classroom</h1>
      <div className="flex justify-center my-4">
        {isLoading && <h2 className="text-2xl">Loading...</h2>}
        {isError && <h2 className="text-2xl">Something went wrong</h2>}
        {isSuccess && requests.length < 1 && (
          <h2 className="text-2xl">No Requests</h2>
        )}
        {isSuccess && requests.length > 0 && (
          <ul className="w-full max-w-5xl">
            {requests.map((request) => {
              return (
                <li
                  key={request.id}
                  className="px-8 flex justify-between items-center pt-4 pb-2 border-b-2 border-b-gray-200"
                >
                  <h2 className="text-lg font-semibold">{request.name}</h2>
                  <div className="flex gap-4 text-sm">
                    <button
                      className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg"
                      onClick={() => handleApprove(request.id)}
                      disabled={requestLoading}
                    >
                      Accept
                    </button>
                    <button
                      className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg"
                      onClick={() => handleReject(request.id)}
                      disabled={requestLoading}
                    >
                      Reject
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </main>
  );
};
