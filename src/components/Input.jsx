export const Input = ({ text, type, placeholder, value, change, error }) => {
  return (
    <div className="w-full mb-3">
      <label htmlFor={text}>
        <p className="text-lg font-nunito font-bold">{text}</p>
        <input
          type={type}
          name={text}
          id={text}
          value={value}
          placeholder={placeholder}
          className="w-full px-3 py-2 border-2 border-black rounded-xl focus:outline-none focus:border-primary"
          onChange={change}
        />
        <div
          className={"px-3 text-primary text-sm " + (error ? "h-4" : "h-fit")}
        >
          {error}
        </div>
      </label>
    </div>
  );
};
