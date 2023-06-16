import { z } from "zod";

import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { makeLabel } from "~/core/commands/label/makeLabel";
import { type Command } from "~/core/commands/types";
import { applicationService } from "~/core/services/application";

export const labelInput = z
  .string()
  .min(1, "Label name must be at least 1 character long");

export type LabelInputSchema = z.infer<typeof labelInput>;

export class LabelCommand implements Command {
  public type = "label.create" as const;
  public description =
    "Creates a label in the form with the given value. Value is an string that contains the value of the label";

  public create(input: LabelInputSchema) {
    const validationResult = labelInput.safeParse(input);

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    this.handler(input);
    this.historyHandler(input);

    return "Label created successfully";
  }

  public handler = <LabelInputSchema>(input: LabelInputSchema) => {
    const { args } = commandAnalyzer(input as string);
    const [value = ""] = args ?? [];

    const appState = applicationService.getApplicationState();

    applicationService.updateApplicationState([
      ...appState,
      {
        id: appState.length + 1,
        viewType: "label" as const,
        component: makeLabel([value]),
      },
    ]);
  };

  public historyHandler(input: string) {
    const { type } = commandAnalyzer(input);

    const history = applicationService.getHistoryState();

    applicationService.updateHistoryState([
      ...history,
      {
        type,
        input,
      },
    ]);
  }
}
