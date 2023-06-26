const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");

const mongoose = require("mongoose");

const http = require("http");
const socket = require("socket.io");

const server = http.createServer(app);

const { GenerateMessage } = require("./utils/message");

const io = socket(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  socket.join(userId);
  socket.broadcast.emit(
    "join-chat",
    GenerateMessage({
      from: "admin",
      message: "A new user joined",
    })
  );

  io.to(userId).emit(
    "join-chat",
    GenerateMessage({
      from: "admin",
      message: "You joined the chat",
    })
  );
  console.log("user connected");

  socket.on("disconnect", () => {
    socket.broadcast.emit(
      "user_disconnect",
      GenerateMessage({
        message: "A user left the chat",
        from: "admin",
      })
    );
    socket.emit(
      "user_disconnect",
      GenerateMessage({
        message: "You left the chat",
        from: "Admin",
      })
    );
  });

  socket.on(
    "createMessage",
    ({ message, from, receivers = [], sender }, callback) => {
      receivers = [...receivers, userId];
      receivers?.forEach((id) => {
        console.log(id);
        io.to(id).emit("receive-message", {
          message,
          from,
          sender,
        });
      });

      if (callback) {
        callback({ message, from, createdAt: Date.now(), sender });
      }
    }
  );
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then((response) => {
    server.listen(process.env.PORT, () => {
      console.log("server already runnning");
    });
  })
  .catch((err) => {
    console.log(err);
  });
