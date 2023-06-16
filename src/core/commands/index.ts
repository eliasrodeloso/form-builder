import { buttonActions } from "~/core/commands/button";
import { formActions } from "~/core/commands/form";
import { inputActions } from "~/core/commands/input";

export const commandCreators = {
  "input.create": inputActions.create,
  "form.clear": formActions.clear,
  "button.create": buttonActions.create,
};
