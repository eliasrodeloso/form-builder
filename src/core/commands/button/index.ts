import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type Command } from "~/core/commands/types";
import { type ApplicationState, type ViewElement } from "~/core/models/types";

export const buttonActions: Record<"create", Command> = {
  create: {
    type: "button.create",
    handler: (input: string, appState: ApplicationState) => {
      const { args } = commandAnalyzer(input);
      const [value = "", typeInput = "submit"] = args ?? [];

      const newState = new Set(appState.state);

      return {
        state: newState.add({
          id: newState.size + 1,
          viewType: "button",
          type: typeInput as ViewElement["type"],
          value,
        }),
      };
    },
  },
};
