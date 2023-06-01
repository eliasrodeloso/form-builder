import { type CommandType } from "~/core/store/commands";
import { formClearer } from "~/features/viewer/components/formClearer";
import { makeInput } from "~/features/viewer/components/makeInput";

export type CommandExecutorFn = (args?: string[]) => React.FC;

export const commandMapper: Record<CommandType, CommandExecutorFn> = {
  "form.clear": formClearer,
  "input.create": makeInput,
  "button.create": makeInput,
  "label.create": makeInput,
  "select.create": makeInput,
};
