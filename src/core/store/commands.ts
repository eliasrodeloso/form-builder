import { createStore } from "../helpers/createStore";

export const commandTypes = [
  "form.clear",
  "input.create",
  "label.create",
  "select.create",
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

export const commandStore = createStore<Command[]>([
  {
    type: "input.create",
    input: 'input.create "First Name"',
    args: ["First Name"],
    id: 1,
  },
]);

export function addCommand(value: string) {
  if (!commandTypes.find((type) => value.startsWith(type))) {
    return;
  }

  const command = {
    type: value.split(" ")[0] as CommandType,
    value: value.split(" ").slice(1),
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
