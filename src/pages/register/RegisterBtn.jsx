import { useEffect, useState } from "react";

import { ButtonFull } from "../../components/ButtonFull";

export const RegisterBtn = ({ enabled }) => {
  const userData = JSON.parse(localStorage.getItem("RegisterData"));
  const [data, setData] = useState(userData);
  return (
    <div className="w-full">
      <ButtonFull text="Register" enabled={enabled} clickHandler={() => {}} />
    </div>
  );
};
