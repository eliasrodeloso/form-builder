import { DynamicTool } from "langchain/tools";

import { type Command, type CommandAction } from "~/core/commands/types";
import { type ApplicationState } from "~/core/services/types";

export const formActions: Record<CommandAction, Command> = {
  clear: {
    type: "form.clear",
    handler: (_input: string, _appState: ApplicationState) => [],
    historyHandler: (_input: string, history) => {
      return [...history];
    },
    tool: new DynamicTool({
      name: "form.clear",
      description: "Clears all the items in the created form and start over",
      func: async () => {
        return Promise.resolve("form.clear");
      },
    }),
  },
  create: {
    type: "form.create",
    handler: (_input: string, _appState: ApplicationState) => [],
    historyHandler: (_input: string, history) => {
      return [...history];
    },
    tool: new DynamicTool({
      name: "form.create",
      description: "Creates the HTML form element in the DOM",
      func: async () => {
        return Promise.resolve("form.create");
      },
    }),
  },
};
