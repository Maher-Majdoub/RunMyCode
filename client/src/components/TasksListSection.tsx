import { Stack, Typography } from "@mui/material";
import { Task, useTasksContext } from "../providers/TasksProvider";
import { useSocketContext } from "../providers/SocketProvider";
import useTasksNotificationsListner from "../hooks/useTasksNotificationsListner";
import "../app.css";

const getVerdictClassName = (task: Task) => {
  return !task.isFinished
    ? "color-gray"
    : task.isAccepted
    ? "color-green"
    : "color-red";
};

const TasksListSection = () => {
  const socket = useSocketContext();
  const { tasks, addTask } = useTasksContext();

  useTasksNotificationsListner(socket, addTask);

  return (
    <Stack flex={1} spacing={3}>
      <Typography variant="h5">Current Tasks</Typography>
      <table>
        <thead>
          <th>#</th>
          <th>When</th>
          <th>Language</th>
          <th>Verdict</th>
          <th>Time</th>
          <th>Memory</th>
        </thead>
        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{new Date(task.startTime).toLocaleString()}</td>
                <td>{task.language}</td>
                <td className={getVerdictClassName(task)}>{task.message}</td>
                <td>{task.isFinished ? task.executionTime : 0} ms</td>
                <td>{task.isFinished ? task.usedMemory : 0} KB</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Stack>
  );
};

export default TasksListSection;
