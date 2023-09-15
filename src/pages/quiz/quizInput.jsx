export const QuizInput = ({
  htmlFor,
  label,
  type,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <label htmlFor={htmlFor} className="w-full">
      <h4>{label}</h4>
      <input
        id={htmlFor}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:text-primary"
      />
    </label>
  );
};
