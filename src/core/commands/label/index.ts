import { Subscription } from "rxjs";
import { z } from "zod";

import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { makeLabel } from "~/core/commands/label/makeLabel";
import { type Command, type HistoryItem } from "~/core/commands/types";
import { ApplicationService, applicationService } from "~/core/services/application";
import { type ApplicationState } from "~/core/services/types";

export const labelInput = z
  .string()
  .min(1, "Label name must be at least 1 character long");

export type LabelInputSchema = z.infer<typeof labelInput>;

export class LabelCommand implements Command {
  public type = "label.create" as const
  public description = "Creates a label in the form with the given value. Value is an string that contains the value of the label"
  private subscription: Subscription;

  constructor()  {
    this.subscription = applicationService.onApplicationState().subscribe()
  }

  public create(input: LabelInputSchema) {
    const validationResult = labelInput.safeParse(input);

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    applicationService.addCommand(`label.create "${input}"`);

    return "Label created successfully";
  }

  public handler = <LabelInputSchema>(input: LabelInputSchema) => {
    const { args } = commandAnalyzer(input as string);
    const [value = ""] = args ?? [];

    applicationService.onApplicationState().subscribe((state) => {
      const newState = [
        ...state,
        {
          id: state.length + 1,
          viewType: "label" as const,
          component: makeLabel([value]),
        },
      ];

      applicationService.updateApplicationState(newState);
    })
  }

  public historyHandler(input: string, history: HistoryItem[]) {
    const { type } = commandAnalyzer(input);

    return [
      ...history,
      {
        input: input,
        type,
      },
    ];
  },
};
