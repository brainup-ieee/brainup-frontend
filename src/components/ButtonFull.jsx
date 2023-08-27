import { Loader } from "./Loader";

export const ButtonFull = ({ text, enabled, clickHandler, isLoading }) => {
  return (
    <button
      disabled={!enabled}
      className={
        "w-full text-white text-lg px-4 py-2 rounded-xl " +
        (enabled ? "bg-primary" : "bg-primary-light")
      }
      onClick={clickHandler}
    >
      {isLoading && <Loader />}
      <span>{text}</span>
    </button>
  );
};
