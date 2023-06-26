export const InputComponent = ({
  type = "text",
  name,
  values = {},
  setValues,
  title,
}) => {
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col">
      <label htmlFor="font-mono my-2 text-base text-slate-800 font-light tracking-wide">
        {title}
      </label>
      <input
        name={name}
        value={values[name]}
        onChange={handleChange}
        className="w-full border-2 border-slate-600 p-2 px-3"
        type={type}
      />
    </div>
  );
};
