import { type ZodError } from "zod";

export function errorFormatter(error: ZodError) {
  return error.issues
    .map(
      (issue) =>
        `The parameter "${issue.path.join(
          "."
        )}" you sent is invalid. The reason is the following: ${issue.message}`
    )
    .join("\n");
}
