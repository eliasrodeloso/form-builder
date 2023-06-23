import { v4 as uuid } from "uuid";
import * as y from "yup";

import { makeInput } from "~/core/commands/input/makeInput";
import { CommandBase, CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

enum InputTypes {
  Text = "text",
  Number = "number",
  Password = "password",
  Email = "email",
  Date = "date",
}

export const inputParams = y.object({
  name: y.string().required(),
  type: y.mixed<InputTypes>().optional().default(InputTypes.Text),
});

export type InputParamsSchema = y.InferType<typeof inputParams>;

export class CreateInputCommand
  extends CommandBase<InputParamsSchema>
  implements Command<InputParamsSchema>
{
  constructor() {
    super(
      CommandType.CreateInput,
      'Creates a new HTML input element in the form. It receives two parameters: <name> and <type>. <name> is the name of the input. <type> is type of the input and is defaulted to text if not specified, other values for <type> are: "number", "password", "email", "date". These parameters should be sent as plain text separated by a comma and a space. Example: "<name>", <type>',
      inputParams
    );
  }

  public create = async (input: string) => {
    const params = this.validateInput(input);

    this.handler(params);
    this.registerHistory(params);

    return Promise.resolve("Input created successfully!");
  };

  public handler = (params: InputParamsSchema) => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState([
      ...appState,
      {
        id: uuid(),
        viewType: ViewTypes.Input,
        component: makeInput([params.name, params.type]),
      },
    ]);
  };
}
