import { QueryClient, QueryClientProvider } from "react-query";
import SocketProvider from "./providers/SocketProvider";
import HomePage from "./components/HomePage";
import TasksProvider from "./providers/TasksProvider";
import "./app.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SocketProvider>
        <TasksProvider>
          <HomePage />
        </TasksProvider>
      </SocketProvider>
    </QueryClientProvider>
  );
}

export default App;
