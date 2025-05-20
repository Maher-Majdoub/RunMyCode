import fs from "fs";

export class FileHandler {
  static deleteFiles(...filePaths: string[]) {
    filePaths.map((filePath) => fs.unlink(filePath, () => {}));
  }
}
