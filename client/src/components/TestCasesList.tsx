import { Stack, Typography, Button } from "@mui/material";
import { TestCase } from "./HomePage";
import { useState } from "react";
import AddTestCaseDialog from "./AddTestCaseDialog";

interface Props {
  testCases: TestCase[];
  addTestCase(testCase: TestCase): void;
}

const TestCasesList = ({ testCases, addTestCase }: Props) => {
  const [showAddTestCaseDialog, setShowAddTestCaseDialog] = useState(false);

  return (
    <>
      <Stack spacing={1}>
        <Typography>Test Cases: </Typography>
        <table>
          <thead>
            <th>#</th>
            <th>Input</th>
          </thead>
          <tbody>
            {testCases.map(({ input }, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{input.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Button
          variant="outlined"
          onClick={() => setShowAddTestCaseDialog(true)}
        >
          Add Test Case
        </Button>
      </Stack>
      <AddTestCaseDialog
        open={showAddTestCaseDialog}
        addTestCase={addTestCase}
        onClose={() => setShowAddTestCaseDialog(false)}
      />
    </>
  );
};

export default TestCasesList;
