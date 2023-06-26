import Routes from "./routes/index";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [socketState, setSocketState] = useState();
  // useEffect(() => {
  //   const socket = io("http://localhost:3000", {
  //     transports: ["websocket"],
  //   });
  //   socket.on("connect", () => {
  //     setSocketState(socket);
  //     socket.on("join-chat", (message) => {
  //       console.log(message);
  //     });
  //     console.log(socket.id);
  //   });

  //   socket.on("disconnect", () => {
  //     console.log("user disconnected");
  //   });

  //   socket.emit(
  //     "createMessage",
  //     {
  //       message: "Chattinng from edge",
  //       from: "Edge",
  //     },
  //     () => {
  //       console.log("message sent to the server");
  //     }
  //   );

  //   socket.on("receive-message", (message) => {
  //     console.log(message);
  //   });

  //   socket.on("user_disconnect", (message) => {
  //     console.log(message);
  //   });
  // }, []);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
