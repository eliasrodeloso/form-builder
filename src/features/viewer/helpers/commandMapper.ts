import { type CommandType } from "~/core/store/commands";
import { formClearer } from "~/features/viewer/components/formClearer";
import { makeButton } from "~/features/viewer/components/makebutton";
import { makeInput } from "~/features/viewer/components/makeInput";
import { makeLabel } from "~/features/viewer/components/makeLabel";

export type CommandExecutorFn = (args?: string[]) => React.FC;

export const commandMapper: Record<CommandType, CommandExecutorFn> = {
  "form.clear": formClearer,
  "input.create": makeInput,
  "button.create": makeButton,
  "label.create": makeLabel,
  "select.date.create": makeInput,
  none: () => () => null,
};
