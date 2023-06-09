import { DynamicTool } from "langchain/tools";

import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type Command, type HistoryItem } from "~/core/commands/types";
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
