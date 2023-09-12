import { useContext } from "react";
import { AuthContext } from "../../contexts/authAlert";
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

export const SigninBtn = ({ enabled, data: state }) => {
  const navigate = useNavigate();
  const SigninMutation = useSignin(state);
  const { setAuthAlert } = useContext(AuthContext);

  const SigninHandler = async () => {
    const { data } = await SigninMutation.mutateAsync(state);
    if (data.status === "failed") {
      setAuthAlert({
        show: true,
        message: data.message,
      });
    } else if (data.status === "success") {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("user-type", data["user-type"]);
      localStorage.removeItem("userLogin");
      navigate("/");
    }
  };
  return (
    <div className="w-full">
      <ButtonFull
        text={SigninMutation.isLoading ? "...Loading" : "Sign in"}
        enabled={enabled && !SigninMutation.isLoading}
        clickHandler={SigninHandler}
        isLoading={SigninMutation.isLoading}
      />
    </div>
  );
};
