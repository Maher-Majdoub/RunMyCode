import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocketContext = () => useContext(SocketContext);

interface Props {
  children: ReactNode;
}

const SocketProvider = ({ children }: Props) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (socket) return;

    const newSocket = io("http://localhost:3000");
    newSocket.emit("message", "hello");

    newSocket.on("socketId", (socketId) => {
      localStorage.setItem("socketId", socketId);
    });

    setSocket(newSocket);

    return () => {
      newSocket.off("socketId");
      newSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
