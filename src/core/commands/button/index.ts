import { DynamicTool } from "langchain/tools";

import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type Command } from "~/core/commands/types";
import { type ApplicationState, type ViewElement } from "~/core/services/types";

export const buttonActions: Record<"create", Command> = {
  create: {
    type: "button.create",
    handler: (input: string, appState: ApplicationState) => {
      const { args } = commandAnalyzer(input);
      const [value = "", typeInput = "submit"] = args ?? [];

      return [
        ...appState,
        {
          id: appState.length + 1,
          viewType: "button",
          type: typeInput as ViewElement["type"],
          value,
        },
      ];
    },
    historyHandler: (input: string, history) => {
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
      name: "button",
      description: "A button that can be clicked to trigger an action",
      func: async (input, runManager) => {
        console.log("input", input);
        console.log("runManager", runManager);

        return Promise.resolve("button.create");
      },
    }),
  },
};
