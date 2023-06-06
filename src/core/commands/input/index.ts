import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type Command } from "~/core/commands/types";
import { type ApplicationState, type ViewElement } from "~/core/models/types";

export const inputActions: Record<"create", Command> = {
  create: {
    type: "input.create",
    handler: (input: string, appState: ApplicationState) => {
      const { args } = commandAnalyzer(input);
      const [name = "defaultName", typeInput = "text"] = args ?? [];

      const newState = new Set(appState.state);

      return {
        state: newState.add({
          id: newState.size + 1,
          viewType: "input",
          type: typeInput as ViewElement["type"],
          name: name,
        }),
      };
    },
  },
};
