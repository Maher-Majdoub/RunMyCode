import { CppCodeRunner } from "../CodeRunner/CppCodeRunner";
import { TMP_DIR } from "../../utils/constants";
import { v4 as uuid } from "uuid";
import fs from "fs";

export class ResultChecker {
  private checkerCodePath;
  private codeRunner;

  constructor(checkerCodePath: string) {
    this.checkerCodePath = checkerCodePath;
    this.codeRunner = new CppCodeRunner(5, 500, 1, this.checkerCodePath);
  }

  public async checkResult(inputPath: string, resultPath: string) {
    const newInputPath = `${TMP_DIR}/${uuid()}.in`;
    const outputPath = `${TMP_DIR}/${uuid()}.out`;

    const input = fs.readFileSync(inputPath, "utf8");
    const output = fs.readFileSync(resultPath, "utf8");

    const newInput = input + "\n" + output;

    fs.writeFileSync(newInputPath, newInput, "utf8");

    const result = await this.codeRunner.run(newInputPath, outputPath);
    return result.isSuccess;
  }
}
