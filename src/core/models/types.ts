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

export const viewTypes = ["input", "label", "select", "button"] as const;

// prettier-ignore
export type ViewType = typeof viewTypes[number];

export type Command = {
  id: number;
  input: string;
  type: CommandType;
  args?: string[];
};

export type CommandView = {
  id: CommandType;
  viewType: ViewType;
  name: string;
  type?: "password" | "text";
};

export type ApplicationState = {
  commandsView: (CommandView | null)[];
  history: Command[];
};
