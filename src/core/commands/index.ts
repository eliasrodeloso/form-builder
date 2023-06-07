import { buttonActions } from "~/core/commands/button";
import { formActions } from "~/core/commands/form";
import { inputActions } from "~/core/commands/input";
import { labelActions } from "~/core/commands/label";
import { type Commands } from "~/core/commands/types";

export const commandCreators: Commands = {
  "input.create": inputActions.create,
  "form.clear": formActions.clear,
  "button.create": buttonActions.create,
  "label.create": labelActions.create,
};
