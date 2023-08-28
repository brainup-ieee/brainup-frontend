import { useState, useContext } from "react";
import { RegisterContext } from "../../contexts/register";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ButtonFull } from "../../components/ButtonFull";

const useRegister = (data) => {
  return useMutation(["register"], () =>
    axios.post("https://brainup-api.mazenamir.com/api/auth/register", {
      username: data.username,
      name: data.name,
      password: data.password,
      user_type: data.user_type === 1 ? "teacher" : "student",
      email: data.email,
      phone_number: data.phone,
    })
  );
};

export const RegisterBtn = ({ enabled }) => {
  const navigate = useNavigate();
  const { register, setRegister } = useContext(RegisterContext);
  const userData = JSON.parse(localStorage.getItem("userRegisterData"));
  const [data, setData] = useState({ ...userData });
  const registerMutation = useRegister(data);

  const registerHandler = async () => {
    const { data } = await registerMutation.mutateAsync();
    if (data.status === "failed") {
      alert(data.message);
      setRegister((prev) => ({ ...prev, step: 2 }));
      localStorage.setItem(
        "userRegisterData",
        JSON.stringify({ ...register, step: 2 })
      );
    } else if (data.status === "success") {
      alert(data.message);
      localStorage.removeItem("userRegisterData");
      navigate("/signin");
    }
  };

  return (
    <div className="w-full">
      <ButtonFull
        text={registerMutation.isLoading ? "...Loading" : "Register"}
        enabled={enabled && !registerMutation.isLoading}
        clickHandler={registerHandler}
        isLoading={registerMutation.isLoading}
      />
    </div>
  );
};
