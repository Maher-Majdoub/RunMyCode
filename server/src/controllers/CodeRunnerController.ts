import { Python2CodeRunner } from "../services/CodeRunner/Python2CodeRunner";
import { Python3CodeRunner } from "../services/CodeRunner/Python3CodeRunner";
import { Request, Response } from "express";
import { JavaCodeRunner } from "../services/CodeRunner/JavaCodeRunner";
import { CppCodeRunner } from "../services/CodeRunner/CppCodeRunner";
import { FileHandler } from "../utils/FilesHandler";
import { CCodeRunner } from "../services/CodeRunner/CCodRunner";
import { CodeRunner } from "../services/CodeRunner/CodeRunner";
import { v4 as uuid } from "uuid";
import { TMP_DIR } from "../utils/constants";
import { io } from "../app";
import { ResultChecker } from "../services/ResultChecker/ResultChecker";

interface TestCase {
  input: string;
}

interface Task {
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

export class CodeRunnerController {
  public execute = async (req: Request, res: Response) => {
    const taskId = uuid();
    const socketId = req.body.socketId;

    const selectedLanguage = req.body.selectedLanguage;

    let task: Task = {
      taskId,
      startTime: new Date(Date.now()),
      isFinished: false,
      isAccepted: false,
      message: "In Queue",
      executionTime: 0,
      usedMemory: 0,
      lastUpdate: new Date(Date.now()),
      language: selectedLanguage,
    };

    res.send(task);

    const sourceCode = req.body.sourceCode;
    const testCases = req.body.testCases as TestCase[];
    const checkerCode = req.body.checkerCode;

    const resultChecker = new ResultChecker(checkerCode);

    const codeRunner = this.getCodeRunner(selectedLanguage, 2, 90, sourceCode);
    const outputPath = `${TMP_DIR}/${uuid()}.out`;

    let testCaseNumber = 1;

    for (const testCase of testCases) {
      task.message = `Running on test case ${testCaseNumber}`;
      task.lastUpdate = new Date(Date.now());
      this.sendTaskNotification(socketId, task);

      const result = await codeRunner.run(testCase.input, outputPath);

      task.executionTime = Math.max(task.executionTime, result.executionTime);
      task.usedMemory = Math.max(task.usedMemory, result.usedMemory);
      task.lastUpdate = new Date(Date.now());
      if (!result.isSuccess) {
        task.isFinished = true;
        task.message = `${result.message} on test ${testCaseNumber}`;
        this.sendTaskNotification(socketId, task);

        FileHandler.deleteFiles(testCase.input, sourceCode, outputPath);

        return;
      }

      const isAccepted = await resultChecker.checkResult(
        testCase.input,
        outputPath
      );

      FileHandler.deleteFiles(testCase.input);

      if (testCaseNumber === testCases.length || !isAccepted) {
        task.isFinished = true;
        task.isAccepted = isAccepted;
        task.message = isAccepted
          ? "Accepted"
          : `Wrong Answer on test ${testCaseNumber}`;

        this.sendTaskNotification(socketId, task);
        return;
      }

      testCaseNumber++;
    }

    FileHandler.deleteFiles(sourceCode, outputPath);
  };

  sendTaskNotification(socketId: string, task: Task) {
    io.to(socketId).emit("taskNotification", task);
  }

  private getCodeRunner(
    language: string,
    timeLimit: number,
    memoryLimit: number,
    sourceCode: string
  ): CodeRunner {
    switch (language) {
      case "c":
        return new CCodeRunner(timeLimit, memoryLimit, 0.5, sourceCode);
      case "cpp":
        return new CppCodeRunner(timeLimit, memoryLimit, 0.5, sourceCode);
      case "java":
        return new JavaCodeRunner(timeLimit, memoryLimit, 0.5, sourceCode);
      case "python2":
        return new Python2CodeRunner(timeLimit, memoryLimit, 0.5, sourceCode);
      case "python3":
        return new Python3CodeRunner(timeLimit, memoryLimit, 0.5, sourceCode);
      default:
        throw new Error(
          `Unsupported Porgramming language Language: ${language}`
        );
    }
  }
}
