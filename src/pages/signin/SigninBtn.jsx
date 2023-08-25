import { useState } from "react";
import { ButtonFull } from "../../components/ButtonFull";

export const SigninBtn = ({ enabled }) => {
  const userData = JSON.parse(localStorage.getItem("RegisterData"));
  const [data, setData] = useState(userData);
  return (
    <div className="w-full">
      <ButtonFull text="Sign in" enabled={enabled} clickHandler={() => {}} />
    </div>
  );
};
