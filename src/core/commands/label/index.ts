import { z } from "zod";

import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { makeLabel } from "~/core/commands/label/makeLabel";
import { CommandType, type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { ViewTypes } from "~/core/services/types";

export const labelInput = z
  .string()
  .min(1, "Label name must be at least 1 character long");

export type LabelInputSchema = z.infer<typeof labelInput>;

export class LabelCommand implements Command {
  public type = CommandType.CreateLabel;
  public description =
    "Creates a label in the form with the given value. Value is an string that contains the value of the label";

  public create(input: LabelInputSchema) {
    const validationResult = labelInput.safeParse(input);

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    this.handler(input);

    return "Label created successfully";
  }

  public handler = <LabelInputSchema>(input: LabelInputSchema) => {
    const { args } = commandAnalyzer(input as string);
    const [value = ""] = args ?? [];

    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState(
      [
        ...appState,
        {
          id: appState.length + 1,
          viewType: ViewTypes.label,
          component: makeLabel([value]),
        },
      ],
      {
        input: value,
        type: this.type,
      }
    );
  };
}
