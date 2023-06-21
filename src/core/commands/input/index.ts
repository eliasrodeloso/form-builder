import { z } from "zod";

import { makeInput } from "~/core/commands/input/makeInput";
import { CommandType, type Command } from "~/core/commands/types";
import { errorFormatter } from "~/core/helpers/errorFormatter";
import { sanitizeInputs } from "~/core/helpers/sanitizeInput";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export const inputParams = z.object({
  name: z.string(),
  type: z
    .enum(["text", "number", "password", "email", "date"])
    .optional()
    .default("text"),
});

export type InputParamsSchema = z.infer<typeof inputParams>;

export class CreateInputCommand implements Command<InputParamsSchema> {
  public type = CommandType.CreateInput;
  public description =
    "Creates a new HTML input element in the form with the specified <name> and <type> parameters. <name> is an string containing the name of the input. <type> is an string containing the type of the input and is defaulted to text if not specified. Other values for <type> are: number, password, email, date. These parameters should be sent as a single string separated by a comma.";

  public create = async (input: string) => {
    console.log(this.type, input);

    const sanitized = sanitizeInputs(input);
    const [name, type] = sanitized.split(",").map((param) => param.trim());

    const validationResult = inputParams.safeParse({
      name,
      type,
    });

    if (!validationResult.success) {
      const message = errorFormatter(validationResult.error);
      return message;
    }

    this.handler(validationResult.data);

    return Promise.resolve("Input created successfully!");
  };

  public handler = (params: InputParamsSchema) => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState(
      [
        ...appState,
        {
          id: appState.length + 1,
          viewType: ViewTypes.Input,
          component: makeInput([params.name, params.type]),
        },
      ],
      {
        input: [`"${params.name}"`, params.type].join(" "),
        type: this.type,
      }
    );
  };
}
