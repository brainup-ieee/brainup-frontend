import { Link } from "react-router-dom";
import { Button } from "./Button";

export const ListContainer = ({ list, url }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {list.map((item) => {
        return (
          <div key={item.id} className="flex flex-col gap-2 p-4 border bg-secondary text-primary rounded-lg">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p>{item.description}</p>
            <Button link={`${url}/${item.id}`} text="View" />
          </div>
        );
      })}
    </div>
  );
};
