import { exec } from "child_process";

interface RunResult {
  isSuccess: boolean;
  executionTime: number;
  usedMemory: number;
  message: string;
}

export abstract class CodeRunner {
  protected timeLimit: number;
  protected memoryLimit: number;
  protected cpus: number;
  protected sourceCodePath: string;
  protected sandboxProgPath = "/usr/src/app/sourceCode";
  protected sandboxInputPath = "/usr/src/app/input";

  constructor(
    timeLimit: number,
    memorylimit: number,
    cpus: number,
    sourceCodePath: string
  ) {
    this.timeLimit = timeLimit;
    this.memoryLimit = memorylimit;
    this.cpus = cpus;
    this.sourceCodePath = sourceCodePath;
  }

  public async run(inputPath: string, outputPath: string): Promise<RunResult> {
    return new Promise((resolve, reject) => {
      exec(this.getRunCommand(inputPath, outputPath), (error, _, stderr) => {
        if (error)
          return resolve({
            isSuccess: false,
            message: this.getErrorMessage(error.code),
            executionTime: 0,
            usedMemory: 0,
          });

        resolve({
          isSuccess: true,
          message: "Run Finished",
          executionTime: this.getExecutionTime(stderr),
          usedMemory: this.getMemoryUsage(stderr),
        });
      });
    });
  }

  private getErrorMessage(errorCode: number | undefined) {
    if (errorCode === 1) return "Compilation Error";
    if (errorCode === 2) return "Runtime Error";
    if (errorCode === 124) return "Time Limit Exceeded";
    if (errorCode === 9) return "Memory Limit Exceeded";
    return "Unknown Error";
  }

  private getExecutionTime(stderr: string): number {
    const executionTimeMatch = stderr.match(
      /Elapsed \(wall clock\) time \(h:mm:ss or m:ss\): (\d+m \d+\.\d+s)/
    );

    if (!executionTimeMatch) throw new Error("Invalid Result");

    return (
      Number(
        executionTimeMatch[1].substring(
          executionTimeMatch[1].indexOf("m") + 2,
          executionTimeMatch[1].length - 1
        )
      ) * 1000
    );
  }

  private getMemoryUsage(stderr: string): number {
    const memoryUsageMatch = stderr.match(
      /Maximum resident set size \(kbytes\): (\d+)/
    );

    if (!memoryUsageMatch) throw new Error("Invalid Result");
    return Number(memoryUsageMatch[1]);
  }

  protected abstract getRunCommand(
    inputPath: string,
    outputPath: string
  ): string;
}
