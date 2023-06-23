import { v4 as uuid } from "uuid";
import * as y from "yup";

import { makeLabel } from "~/core/commands/label/makeLabel";
import { CommandBase, CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export const labelInput = y.object({
  value: y
    .string()
    .min(1, "Label name must be at least 1 character long")
    .required(),
  inputName: y
    .string()
    .min(1, "Input name must be at least 1 character long")
    .required(),
});

export type LabelInputSchema = y.InferType<typeof labelInput>;

export class CreateLabelCommand
  extends CommandBase<LabelInputSchema>
  implements Command<LabelInputSchema>
{
  constructor() {
    super(
      CommandType.CreateLabel,
      'Creates a new HTML label that describes an HTML input in the form. It receives two parameters <value> and <inputName>. <value> contains the description and is required. <inputName> is the name of the input it describes and is required. These parameters should be sent as plain text separated by a comma and a space. Example: "<value>", <inputName>',
      labelInput
    );
  }

  public create = async (input: string) => {
    const validationResult = this.validateInput(input);

    this.handler(validationResult);
    this.registerHistory(validationResult);

    return Promise.resolve("Label created successfully!");
  };

  public handler = (params: LabelInputSchema) => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState([
      ...appState,
      {
        id: uuid(),
        viewType: ViewTypes.Label,
        component: makeLabel([
          params.value.replaceAll('"', ""),
          params.inputName,
        ]),
      },
    ]);
  };
}
