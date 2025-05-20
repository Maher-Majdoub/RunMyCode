import { sandboxes } from "../../utils/constants";
import { CodeRunner } from "./CodeRunner";

export class CCodeRunner extends CodeRunner {
  private dockerImageName = sandboxes.c;

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
      docker run -v "${this.sourceCodePath}:${this.sandboxProgPath}.c" \
      -v "${inputPath}:${this.sandboxInputPath}" \
      --rm --memory=${this.memoryLimit}m --memory-swap=0 --cpus="${this.cpus}" \
      ${this.dockerImageName} \
      sh -c " \
      set -e
      gcc -o prog ${this.sandboxProgPath}.c 
      time -v timeout ${this.timeLimit} ./prog < ${this.sandboxInputPath}
      " > ${outputPath}
      EXIT_CODE=$?
      if [ $EXIT_CODE -ne 0 ] && [ $EXIT_CODE -ne 9 ] && [ $EXIT_CODE -ne 124 ] && [ $EXIT_CODE -ne 1 ]; then
        exit 2
      else 
        exit $EXIT_CODE
      fi
    `;

    return command;
  }
}
