import { useMutation } from "react-query";
import axios, { AxiosResponse } from "axios";
import { Task, useTasksContext } from "../providers/TasksProvider";

interface TVariables {
  data: FormData;
}

const handleSendTask = async ({ data }: TVariables) => {
  const socketId = localStorage.getItem("socketId");
  const endpoint = "http://localhost:3000/task";
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      "x-socket-id": socketId,
    },
  };

  return axios
    .post<TVariables, AxiosResponse<Task>>(endpoint, data, config)
    .then((res) => res.data);
};

const useSendTask = () => {
  const { addTask } = useTasksContext();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: handleSendTask,
    onSuccess: addTask,
  });

  return {
    sendTask: mutate,
    isSendTaskSuccess: isSuccess,
    isSendTaskError: isError,
  };
};

export default useSendTask;
