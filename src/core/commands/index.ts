import { buttonActions } from "~/core/commands/button";
import { formActions } from "~/core/commands/form";
import { inputActions } from "~/core/commands/input";
import { type Commands } from "~/core/commands/types";

export const commandCreators: Commands = {
  "input.create": inputActions.create,
  "form.clear": formActions.clear,
  "button.create": buttonActions.create,
};
