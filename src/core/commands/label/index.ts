import { z } from "zod";

import { makeLabel } from "~/core/commands/label/makeLabel";
import { CommandType, type Command } from "~/core/commands/types";
import { sanitizeInputs } from "~/core/helpers/sanitizeInput";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export const labelInput = z.object({
  value: z.string().min(1, "Label name must be at least 1 character long"),
  inputName: z.string().min(1, "Input name must be at least 1 character long"),
});

export type LabelInputSchema = z.infer<typeof labelInput>;

export class CreateLabelCommand implements Command<LabelInputSchema> {
  public type = CommandType.CreateLabel;
  public description =
    'Creates a new HTML label that describes an HTML input in the form. It receives two parameters <value> and <inputName>. <value> contains the description and is required. <inputName> is the name of the input it describes and is required. These parameters should be sent as plain text separated by a comma and a space. Example: "<value>", <inputName>';

  public create = async (input: string) => {
    const sanitized = sanitizeInputs(input);
    const [labelValue, inputName] = sanitized.split(",");
    const validationResult = labelInput.safeParse({
      value: labelValue,
      inputName,
    });

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    this.handler(validationResult.data);

    return Promise.resolve("Label created successfully!");
  };

  public handler = (params: LabelInputSchema) => {
    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState(
      [
        ...appState,
        {
          id: appState.length + 1,
          viewType: ViewTypes.Label,
          component: makeLabel([
            params.value.replaceAll('"', ""),
            params.inputName,
          ]),
        },
      ],
      {
        input: params.value,
        type: this.type,
      }
    );
  };
}
