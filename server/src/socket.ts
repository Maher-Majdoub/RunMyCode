import { Socket } from "socket.io";

export const handleIoConnection = (socket: Socket) => {
  console.log("new io connection:", socket.id);

  socket.emit("socketId", socket.id);
};
