import { io } from "socket.io-client";
import { createContext, useEffect, useContext, useState } from "react";

const socketContext = createContext();

const socketProvider = ({ children }) => {
  const [socketState, setSocketState] = useState();

  useEffect(() => {
    const socket = io("http://localhost:3000?userId=7890", {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      setSocketState(socket);
      socket.on("join-chat", (message) => {
        console.log(message);
      });
      console.log(socket.id);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("user_disconnect", (message) => {
      console.log(message);
    });

    // socket.on("receive-message", (message) => {
    //   console.log(message);
    // });
  }, []);

  return (
    <socketContext.Provider value={{ socket: socketState }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(socketContext);
};

export default socketProvider;
