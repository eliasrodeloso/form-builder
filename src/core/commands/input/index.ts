import { DynamicTool } from "langchain/tools";

import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type Command } from "~/core/commands/types";
import { type ApplicationState, type ViewElement } from "~/core/services/types";

export const inputActions: Record<"create", Command> = {
  create: {
    type: "input.create",
    handler: (input: string, appState: ApplicationState) => {
      const { args } = commandAnalyzer(input);
      const [name = "defaultName", typeInput = "text"] = args ?? [];

      return [
        ...appState,
        {
          id: appState.length + 1,
          viewType: "input",
          type: typeInput as ViewElement["type"],
          name: name,
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
      name: "input.create",
      description:
        "Creates a new HTML input element in the form with the specified name and type.",
      func: async () => {
        return Promise.resolve("input.create");
      },
    }),
  },
};
