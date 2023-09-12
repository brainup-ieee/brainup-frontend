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
          className={
            "w-full px-3 py-2 border-2 border-black rounded-xl focus:outline-none " +
            (error ? "border-[#FF5555]" : "focus:border-primary")
          }
          onChange={change}
        />
        <div className={"px-3 text-[#FF5555] text-sm"}>{error}</div>
      </label>
    </div>
  );
};
