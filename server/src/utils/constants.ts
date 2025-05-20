import path from "path";
import os from "os";

export const TMP_DIR = path.join(os.tmpdir(), "sanboxed-files");

export const sandboxes = {
  c: "sandbox_c",
  cpp: "sandbox_cpp",
  java: "sandbox_java",
  python2: "sandbox_python2",
  python3: "sandbox_python3",
};
