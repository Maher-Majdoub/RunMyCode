import { Stack, Typography } from "@mui/material";
import AddTaskSection from "./AddTaskSection";
import TasksListSection from "./TasksListSection";

export interface TestCase {
  input: File;
}

const HomePage = () => {
  return (
    <Stack alignItems="center" spacing={3} minHeight="100dvh" padding={3}>
      <Typography variant="h5">Run My Code</Typography>
      <Stack
        justifyContent="center"
        direction="row"
        minHeight={0}
        flex={1}
        spacing={4}
        width="100%"
      >
        <AddTaskSection />
        <TasksListSection />
      </Stack>
    </Stack>
  );
};

export default HomePage;
