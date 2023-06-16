import { z } from "zod";

import { makeButton } from "~/core/commands/button/makeButton";
import { CommandType, type Command } from "~/core/commands/types";
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

  public create(input: string) {
    const validationResult = buttonValidationSchema.safeParse(input);

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    this.handler(input);

    return "Button created successfully";
  }

  public handler = (input: ButtonValidationSchema) => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState(
      [
        ...appState,
        {
          id: appState.length + 1,
          component: makeButton([input]),
          viewType: ViewTypes.button,
        },
      ],
      {
        input,
        type: this.type,
      }
    );
  };
}
