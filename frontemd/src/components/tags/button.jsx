const ButtonComponent = ({ title, type = "submit", clickHandler, _style }) => {
  return (
    <button
      type={type}
      onClick={clickHandler}
      className={` px-3 py-2 font-mono text-base text-white bg-green-700 ${_style}`}
    >
      {title}
    </button>
  );
};

export default ButtonComponent;
