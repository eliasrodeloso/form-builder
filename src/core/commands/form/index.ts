import { type Command } from "~/core/commands/types";
import { type ApplicationState } from "~/core/services/types";

export const formActions: Record<"clear", Command> = {
  clear: {
    type: "form.clear",
    handler: (_input: string, _appState: ApplicationState) => [],
    historyHandler: (_input: string, history) => {
      return [...history];
    },
  },
};
