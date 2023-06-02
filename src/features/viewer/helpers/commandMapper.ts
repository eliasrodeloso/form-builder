import { type CommandType } from "~/core/store/commands";
import { makeButton } from "~/features/viewer/components/makeButton";
import { makeInput } from "~/features/viewer/components/makeInput";
import { makeLabel } from "~/features/viewer/components/makeLabel";
import { makeSelect } from "~/features/viewer/components/makeSelect";

export type CommandExecutorFn = (args?: string[]) => React.FC;

export const commandMapper: Record<CommandType, CommandExecutorFn> = {
  "form.clear": () => () => null,
  "input.create": makeInput,
  "button.create": makeButton,
  "label.create": makeLabel,
  "select.date.create": makeSelect,
  none: () => () => null,
};
