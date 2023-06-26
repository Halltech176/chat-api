import { InputComponent } from "../components/tags/input";
import { useState } from "react";
import client from "../client";
import { useSocket } from "../context/socket";
const Register = () => {
  const { socket } = useSocket();
  console.log(socket);

  const [values, setValues] = useState({ username: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await client({
      url: "/auth/register",
      method: "post",
      data: values,
    });
    console.log(response);
  };
  return (
    <form>
      <div className="flex items-center justify-center flex-col">
        <InputComponent
          setValues={setValues}
          name="username"
          title="Username"
          values={values}
        />
        <InputComponent
          setValues={setValues}
          title="Password"
          name="password"
          values={values}
        />
        <button onClick={handleSubmit}>Register</button>
      </div>
    </form>
  );
};

export default Register;
