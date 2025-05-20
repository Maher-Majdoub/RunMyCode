import { createContext, ReactNode, useContext, useState } from "react";

export interface Task {
  taskId: string;
  startTime: Date;
  isFinished: boolean;
  isAccepted: boolean;
  message: string;
  executionTime: number;
  usedMemory: number;
  lastUpdate: Date;
  language: string;
}

interface TasksContextProps {
  tasks: Task[];
  addTask(task: Task): void;
}

const TasksContext = createContext<TasksContextProps>({
  tasks: [],
  addTask: () => {},
});

export const useTasksContext = () => useContext(TasksContext);

interface Props {
  children: ReactNode;
}

const TasksProvider = ({ children }: Props) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks((oldTasks) => {
      if (!oldTasks.some((currTask) => currTask.taskId === task.taskId))
        return [...oldTasks, task];

      return oldTasks.map((currTask) => {
        if (currTask.taskId === task.taskId)
          return task.lastUpdate > currTask.lastUpdate ? task : currTask;

        return currTask;
      });
    });
  };

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks,
        addTask: addTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;
