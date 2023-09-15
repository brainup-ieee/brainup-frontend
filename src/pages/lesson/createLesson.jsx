import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostMutate } from "../../hooks/useFetch";
import { MediaInput } from "../../components/mediaInput";
import { AddIcon } from "../../components/icons/AddIcon";
import { CancelIcon } from "../../components/icons/CancelIcon";

export const CreateLesson = () => {
  const { classroom, id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    classroom_id: id,
    name: "",
    video: null,
    pdf: null,
  });
  const [disableCreate, setDisableCreate] = useState(true);
  const url = "https://brainup-api.mazenamir.com/api/lessons/teacher/create";
  const header = {
    Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    "Content-Type": "multipart/form-data",
  };
  const addLesson = usePostMutate(url, header, formData);

  const handleDisableCreate = () => {
    if (
      formData.name.trim().length > 3 &&
      (formData.video !== null || formData.pdf !== null)
    ) {
      setDisableCreate(false);
    } else {
      setDisableCreate(true);
    }
  };

  useEffect(() => {
    handleDisableCreate();
  }, [formData]);

  const handleChange = (e) => {
    const { name, type, files } = e.target;
    const value = type === "file" ? files[0] : e.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await addLesson.mutateAsync(url, header, formData);

    if (data === undefined) {
      alert("Something went wrong");
      return;
    }

    if (data.status === "success") {
      navigate(`/teacher/classroom/${id}`);
    } else {
      alert("Something went wrong, please try again");
    }
  };

  const handleCancel = () => {
    navigate(`/teacher/classroom/${id}`);
  };

  return (
    <main className="flex justify-center mt-12">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span className="block text-lg font-nunito font-bold">
              Lesson Name
            </span>
            <input
              className="w-full px-3 py-2 border-2 rounded-xl focus:outline-none focus:border-primary focus:text-primary"
              type="text"
              name="name"
              value={formData.name}
              placeholder="Lesson Name"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex gap-8 mt-4">
          <MediaInput
            fileTypes="mp4, mov, avi, mkv, wmv, flv, gif, webm, mpeg, mpg, m4v"
            fileName={formData.video}
            inputName="video"
            onChange={handleChange}
          />

          <MediaInput
            fileTypes="pdf, doc, docx, ppt, pptx, xls, xlsx, txt"
            fileName={formData.pdf}
            inputName="pdf"
            onChange={handleChange}
          />
        </div>
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            disabled={addLesson.isLoading || disableCreate}
            className={
              "px-4 py-2 bg-primary text-white rounded-lg transition-colors duration-200 ease-cubic hover:bg-primary-light flex items-center gap-2" +
              (addLesson.isLoading || disableCreate
                ? " bg-primary-light cursor-not-allowed"
                : "")
            }
          >
            <AddIcon className="w-4 h-4" />
            <div>Create</div>
          </button>
          <button
            disabled={addLesson.isLoading}
            className={
              "px-4 py-2 bg-[#fd4040] text-white rounded-lg transition-colors duration-200 ease-cubic hover:bg-[#fa6565] flex items-center gap-2" +
              (addLesson.isLoading ? " bg-[#fa6565] cursor-not-allowed" : "")
            }
            onClick={handleCancel}
          >
            <CancelIcon className="w-4 h-4" />
            <div>Cancel</div>
          </button>
        </div>
      </form>
    </main>
  );
};
