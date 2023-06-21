import { z } from "zod";

import { makeButton } from "~/core/commands/button/makeButton";
import { CommandType, type Command } from "~/core/commands/types";
import { sanitizeInputs } from "~/core/helpers/sanitizeInput";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export const buttonValidationSchema = z.string().min(1, {
  message: "Button value must be at least 1 character long",
});

export type ButtonValidationSchema = z.infer<typeof buttonValidationSchema>;

export class CreateButtonCommand implements Command<ButtonValidationSchema> {
  public type = CommandType.CreateButton;
  public description =
    "Creates a button element in the form. Input is the value of the button.";

  public create = async (input: string) => {
    console.log(this.type, input);

    const sanitized = sanitizeInputs(input);
    const validationResult = buttonValidationSchema.safeParse(sanitized);

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    this.handler(input);

    return Promise.resolve("Button created successfully");
  };

  public handler = (input: ButtonValidationSchema) => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState(
      [
        ...appState,
        {
          id: appState.length + 1,
          component: makeButton([input]),
          viewType: ViewTypes.Button,
        },
      ],
      {
        input: `"${input}"`,
        type: this.type,
      }
    );
  };
}
