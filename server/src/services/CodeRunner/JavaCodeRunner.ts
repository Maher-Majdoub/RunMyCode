import { sandboxes } from "../../utils/constants";
import { CodeRunner } from "./CodeRunner";

export class JavaCodeRunner extends CodeRunner {
  private dockerImageName = sandboxes.java;

  constructor(
    timeLimit: number,
    memoryLimit: number,
    cpus: number,
    sourceCodePath: string
  ) {
    super(timeLimit, memoryLimit, cpus, sourceCodePath);
  }

  protected getRunCommand(inputPath: string, outputPath: string): string {
    const command = ` \
      docker run \
      -v "${this.sourceCodePath}:${this.sandboxProgPath}.java" \
      -v "${inputPath}:${this.sandboxInputPath}" \
      --rm --memory=${this.memoryLimit}m --memory-swap=0 --cpus="${this.cpus}" \
      ${this.dockerImageName} \
      sh -c "time -v timeout ${this.timeLimit} java ${this.sandboxProgPath}.java < ${this.sandboxInputPath}" \
      > ${outputPath}
      EXIT_CODE=$?
      if [ $EXIT_CODE -eq 1 ]; then
        exit 2
      else
        exit $EXIT_CODE
      fi\
    `;
    return command;
  }
}
