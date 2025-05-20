import { Stack, Typography, Button } from "@mui/material";
import { useRef, useState } from "react";
import { TestCase } from "./HomePage";
import TestCasesList from "./TestCasesList";
import useSendTask from "../hooks/useSendTask";
import "../app.css";

const AddTaskSection = () => {
  const { sendTask } = useSendTask();

  const [testCases, setTestCases] = useState<TestCase[]>([]);

  const sourceCodeFileRef = useRef<HTMLInputElement>(null);
  const checkerCodeFileRef = useRef<HTMLInputElement>(null);
  const languageSelectRef = useRef<HTMLSelectElement>(null);

  const handleSubmition = () => {
    const selectedLanguage = languageSelectRef.current?.value;
    const sourceCodeFile = sourceCodeFileRef.current?.files?.length
      ? sourceCodeFileRef.current.files[0]
      : undefined;
    const checkerCodeFile = checkerCodeFileRef.current?.files?.length
      ? checkerCodeFileRef.current.files[0]
      : undefined;

    if (
      !selectedLanguage ||
      !sourceCodeFile ||
      !checkerCodeFile ||
      !testCases.length
    )
      return;

    const formData = new FormData();
    formData.append("sourceCode", sourceCodeFile);
    formData.append("checkerCode", checkerCodeFile);
    testCases.forEach((testCase, index) => {
      formData.append(`testCase[${index + 1}].input`, testCase.input);
    });

    formData.append("selectedLanguage", selectedLanguage);
    formData.append("testCasesCount", testCases.length.toString());
    sendTask({ data: formData });
  };
  return (
    <Stack spacing={3} flex={1}>
      <Typography variant="h5">Add Task:</Typography>
      <Stack spacing={1}>
        <Stack direction="column" spacing={1}>
          <span>Problem Statement: </span>
          <textarea rows={5} />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span className="w-110">Source Code: </span>
          <input ref={sourceCodeFileRef} type="file" />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span className="w-110">Checker Code: </span>
          <input ref={checkerCodeFileRef} type="file" />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span className="w-110">Language: </span>
          <select ref={languageSelectRef}>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
            <option value="python2">Python 2</option>
            <option value="python3">Python 3</option>
          </select>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span className="w-110">Time limit: </span>
          <input type="number" defaultValue={2} min={1} max={5} />
          <span>{"1 -> 5 Seconds"}</span>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span className="w-110">Memory limit: </span>
          <input type="number" defaultValue={512} min={120} max={512} />
          <span>{"120 -> 512 MB"}</span>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={1}>
          <span className="w-110">Cpus: </span>
          <input type="number" min={0.1} max={2} />
          <span>{"0.1 -> 2 Cores"}</span>
        </Stack>
      </Stack>
      <TestCasesList
        testCases={testCases}
        addTestCase={(testCase) => setTestCases([...testCases, testCase])}
      />
      <Button variant="contained" onClick={handleSubmition}>
        Add Task
      </Button>
    </Stack>
  );
};

export default AddTaskSection;
