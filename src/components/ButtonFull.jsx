export const ButtonFull = ({ text, enabled, clickHandler }) => {
  return (
    <button
      disabled={!enabled}
      className={
        "w-full text-white text-lg px-4 py-2 rounded-xl " +
        (enabled ? "bg-primary" : "bg-primary-light")
      }
      onClick={clickHandler}
    >
      {text}
    </button>
  );
};
