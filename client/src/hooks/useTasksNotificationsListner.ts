import { Socket } from "socket.io-client";
import { Task } from "../providers/TasksProvider";
import { useEffect } from "react";

const useTasksNotificationsListner = (
  socket: Socket | null,
  onNewtask: (task: Task) => void
) => {
  useEffect(() => {
    if (!socket) return;

    socket.on("taskNotification", onNewtask);

    return () => {
      socket.off("taskNotification");
    };
  }, [socket]);
};

export default useTasksNotificationsListner;
