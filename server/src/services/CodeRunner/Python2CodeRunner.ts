import { sandboxes } from "../../utils/constants";
import { CodeRunner } from "./CodeRunner";

export class Python2CodeRunner extends CodeRunner {
  private dockerImageName = sandboxes.python2;

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
      -v "${this.sourceCodePath}:${this.sandboxProgPath}" \
      -v "${inputPath}:${this.sandboxInputPath}" \
      --rm --memory=${this.memoryLimit}m --memory-swap=0 --cpus="${this.cpus}" \
      ${this.dockerImageName} \
      sh -c "time -v timeout ${this.timeLimit} python ${this.sandboxProgPath} < ${this.sandboxInputPath}" \
      > ${outputPath}
      EXIT_CODE=$?
      if [ $EXIT_CODE -ne 0 ] && [ $EXIT_CODE -ne 9 ] && [ $EXIT_CODE -ne 124 ]; then
        exit 2
      else 
        exit $EXIT_CODE
      fi
    `;

    return command;
  }
}
