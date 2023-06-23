import { type ValidationError } from "yup";

export function errorFormatter(error: ValidationError) {
  return error.inner
    .map(
      (issue) =>
        `The parameter "${issue.name}" you sent is invalid. The reason is the following: ${issue.message}`
    )
    .join("\n");
}
