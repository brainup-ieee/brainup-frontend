export const QuizCheckbox = ({ htmlFor, text, className, onChange }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={"w-full flex items-center gap-3 " + className}
    >
      <input
        type="checkbox"
        name="checkbox-one"
        id="checkbox-one"
        onChange={onChange}
        className="cursor-pointer w-7 h-7 border-2 text-primary border-gray-400 focus:outline-none rounded-lg"
      />
      <h4>{text}</h4>
    </label>
  );
};
