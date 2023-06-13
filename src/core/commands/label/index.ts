import { DynamicTool } from "langchain/tools";
import { z } from "zod";

import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import {
  type Command,
  type HistoryItem,
  type RefactoredCommand,
} from "~/core/commands/types";
import { applicationService } from "~/core/services/application";
import { type ApplicationState } from "~/core/services/types";

export const labelActions: Record<"create", Command> = {
  create: {
    type: "label.create",
    handler: (input: string, appState: ApplicationState) => {
      const { args } = commandAnalyzer(input);
      const [value = ""] = args ?? [];

      return [
        ...appState,
        {
          id: appState.length + 1,
          viewType: "label",
          children: value,
        },
      ];
    },
    historyHandler: (input: string, history: HistoryItem[]) => {
      const { type } = commandAnalyzer(input);

      return [
        ...history,
        {
          input: input,
          type,
        },
      ];
    },
    tool: new DynamicTool({
      name: "label.create",
      description: "Creates a label in the form with the given value",
      func: (labelName) => {
        return Promise.resolve(`label.create "${labelName}"`);
      },
    }),
  },
};

export const labelInput = z
  .string()
  .min(1, "Label name must be at least 1 character long");

export type LabelInputSchema = z.infer<typeof labelInput>;

export const labelCommand: RefactoredCommand = {
  type: "label.create",
  description:
    "Creates a label in the form with the given value. Value is an string that contains the value of the label",
  create: (input: LabelInputSchema) => {
    const validationResult = labelInput.safeParse(input);

    if (!validationResult.success) {
      return validationResult.error.message;
    }

    applicationService.addCommand(`label.create "${input}"`);

    return "Label created successfully";
  },
};
