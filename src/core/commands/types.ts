import { type ApplicationState } from "~/core/models/types";

export const commandElements = [
  "input",
  "label",
  "select",
  "button",
  "form",
] as const;
// prettier-ignore
export type CommandElement = typeof commandElements[number];

export const commandActions = ["create", "clear"] as const; // could have update, delete, etc
// prettier-ignore
export type CommandAction = typeof commandActions[number];

export type CommandType = `${CommandElement}.${CommandAction}`;

export type Command = {
  type: CommandType;
  handler: (input: string, appState: ApplicationState) => ApplicationState;
};

export type Commands = { [key in CommandType]?: Command };
