import { useLocation } from "react-router-dom";

export const VarificationPage = () => {
  const location = useLocation();
  const pathname = location.pathname.slice(1);
  
  return <div>{pathname}</div>;
};
