import { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { ButtonFull } from "../../components/ButtonFull";

const useSignin = (data) => {
  return useMutation(["register"], () =>
    axios.post("https://brainup-api.mazenamir.com/api/auth/login", {
      password: data.password,
      user: data.email,
    })
  );
};

export const SigninBtn = ({ enabled, data }) => {
  const navigate = useNavigate();
  const SigninMutation = useSignin(data);

  const SigninHandler = async () => {
    const { data } = await SigninMutation.mutateAsync();
    console.log(data);
    if (data.status === "failed") {
      alert(data.message);
    } else if (data.status === "success") {
      alert("Logged in successfully");
      localStorage.setItem("userToken", data.token);
      localStorage.removeItem("userLogin");
      navigate("/");
    }
  };
  return (
    <div className="w-full">
      <ButtonFull
        text={SigninMutation.isLoading ? "...Loading" : "Sign in"}
        enabled={enabled}
        clickHandler={SigninHandler}
        isLoading={SigninMutation.isLoading}
      />
    </div>
  );
};
