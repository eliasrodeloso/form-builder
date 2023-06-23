import { v4 as uuid } from "uuid";
import * as y from "yup";

import { makeButton } from "~/core/commands/button/makeButton";
import { CommandBase, CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export const buttonValidationSchema = y
  .string()
  .min(1, {
    message: "Button value must be at least 1 character long",
  })
  .required();

export type ButtonValidationSchema = y.InferType<typeof buttonValidationSchema>;

export class CreateButtonCommand
  extends CommandBase<ButtonValidationSchema>
  implements Command<ButtonValidationSchema>
{
  constructor() {
    super(
      CommandType.CreateButton,
      'Creates a button element in the form. It receives a single paramter: <value>. <value> is the action of the button. This parameter should be sent as plain text. Example: "<value>"',
      buttonValidationSchema
    );
  }

  public create = async (input: string) => {
    const validationResult = this.validateInput(input);

    this.handler(validationResult);
    this.registerHistory(validationResult);

    return Promise.resolve("Button created successfully");
  };

  public handler = (input: ButtonValidationSchema) => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState([
      ...appState,
      {
        id: uuid(),
        component: makeButton([input]),
        viewType: ViewTypes.Button,
      },
    ]);
  };
}
