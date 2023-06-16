import { z } from "zod";

import { makeInput } from "~/core/commands/input/makeInput";
import { CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export const inputParams = z.object({
  inputName: z.string(),
  inputType: z
    .enum(["text", "number", "password", "email", "date"])
    .optional()
    .default("text"),
});

export type InputParamsSchema = z.infer<typeof inputParams>;

export class CreateInputCommand implements Command<InputParamsSchema> {
  public type = CommandType.CreateInput;
  public description =
    "Creates a new HTML input element in the form with the specified <name> and <type> parameters. <name> is an string containing the name of the input. <type> is an string containing the type of the input and is defaulted to text if not specified. These parameters should be sent as a single string separated by a comma.";

  public create(input: string) {
    const [inputName, inputType] = input
      .split(",")
      .map((param) => param.trim());

    const validationResult = inputParams.safeParse({
      inputName,
      inputType,
    });

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    this.handler(validationResult.data);

    return "Input created successfully!";
  }

  public handler(params: InputParamsSchema) {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState(
      [
        ...appState,
        {
          id: appState.length + 1,
          viewType: ViewTypes.Input,
          component: makeInput([params.inputName, params.inputType]),
        },
      ],
      {
        input: [params.inputName, params.inputType].join(", "),
        type: this.type,
      }
    );
  }
}
