import { Dialog, Stack, Box, Button, Typography } from "@mui/material";
import { TestCase } from "./HomePage";
import { useRef } from "react";

interface Props {
  open: boolean;
  addTestCase(testCase: TestCase): void;
  onClose(): void;
}

const AddTestCaseDialog = ({ open, addTestCase, onClose }: Props) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSubmition = () => {
    if (!inputFileRef.current?.files?.length) return;

    const input = inputFileRef.current.files[0];

    addTestCase({ input });
    onClose();
  };

  return (
    <Dialog open={open}>
      <Stack spacing={2} padding={2}>
        <Box alignSelf="end">
          <Button onClick={onClose}>X</Button>
        </Box>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography>Input: </Typography>
          <input ref={inputFileRef} type="file" />
        </Stack>
        <Button onClick={handleSubmition}>Add Test Case</Button>
      </Stack>
    </Dialog>
  );
};

export default AddTestCaseDialog;
