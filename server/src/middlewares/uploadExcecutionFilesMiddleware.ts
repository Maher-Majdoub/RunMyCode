import { NextFunction, Request, Response } from "express";
import { TMP_DIR } from "../utils/constants";
import multer from "multer";

const MAX_TEST_CASES_COUNT = 100;

const prepareStorage = () => {
  const storage = multer.diskStorage({
    destination: TMP_DIR,
  });

  return multer({ storage });
};

const fields: multer.Field[] = [
  { name: "sourceCode", maxCount: 1 },
  { name: "checkerCode", maxCount: 1 },
];

for (let i = 1; i <= MAX_TEST_CASES_COUNT; i++) {
  fields.push({ name: `testCase[${i}].input`, maxCount: 1 });
}

export const uploadExecutionFilesMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const initialRequestBody = req.body; // storing data assigned by previous middlewares

  const upload = prepareStorage();

  upload.fields(fields)(req, res, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }

    const testCasesCount = req.body.testCasesCount;
    const selectedLanguage = req.body.selectedLanguage;

    const files = req.files as any;
    const sourceCodePath = files["sourceCode"][0].path;
    const checkerCodePath = files["checkerCode"][0].path;

    const testCases = [];
    for (let i = 1; i <= testCasesCount; i++) {
      const input = files[`testCase[${i}].input`][0].path;
      testCases.push({ input });
    }

    req.body = {
      ...initialRequestBody,
      sourceCode: sourceCodePath,
      checkerCode: checkerCodePath,
      testCases,
      selectedLanguage,
    };

    next();
  });
};
