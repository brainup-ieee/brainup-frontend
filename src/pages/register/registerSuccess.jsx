import { useNavigate } from "react-router-dom";
import success from "../../assets/images/landing-original.webp";
import { ButtonFull } from "../../components/ButtonFull";

export const RegisterSuccess = () => {
  const navigate = useNavigate();

  const signInHandler = () => {
    navigate("/signin");
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-nunito font-bold text-center">
        Congratulations !
      </h2>
      <div className="w-32 h-32">
        <img src={success} alt="success" className="w-full h-full" />
      </div>
      <h3 className="text-sm font-nunito text-center max-w-xs mb-4">
        You have successfully registered, please check your email to activate
      </h3>
      <ButtonFull text="Sign in" enabled={true} clickHandler={signInHandler} />
    </div>
  );
};
