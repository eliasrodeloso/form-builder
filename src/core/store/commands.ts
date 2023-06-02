import { createStore } from "../helpers/createStore";

export const commandTypes = [
  "none",
  "form.clear",
  "input.create",
  "label.create",
  "select.date.create",
  "button.create",
] as const;

// prettier-ignore
export type CommandType = typeof commandTypes[number];

type Command = {
  id: number;
  input: string;
  type: CommandType;
  args?: string[];
};

export const commandStore = createStore<Command[]>([]);

export function addCommand(value: string) {
  const type =
    commandTypes.find((type) => value.split(" ")[0] === type) ?? "none";

  if (type === "form.clear") return commandStore.setState(() => []);

  const secondPart = value
    .substring(type?.length ?? value.length)
    .trim()
    .match(/("[^"]+"|\S+)/g)
    ?.map((el) => el.replace(/"/g, ""));

  const command = {
    type,
    value: secondPart,
  };

  commandStore.setState((state) => [
    ...state,
    {
      id: state.length + 1,
      type: command.type,
      args: command.value,
      input: value,
    },
  ]);
}
