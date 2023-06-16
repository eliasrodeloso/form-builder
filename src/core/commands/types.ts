import { type DynamicTool } from "langchain/tools";

import { type ApplicationState } from "~/core/services/types";

export enum CommandElements {
  "input" = "input",
  "label" = "label",
  "select" = "select",
  "button" = "button",
  "form" = "form",
}

export enum CommandActions {
  "create" = "create",
  "clear" = "clear",
}

export type CommandType = `${CommandElements}.${CommandActions}`;

export type HistoryItem = {
  type: CommandType;
  input: string;
};

export type HistoryState = HistoryItem[];

export interface Command {
  type: CommandType;
  description: string;
  create: (input: string) => string;
  handler: <Schema>(labelValue: Schema) => void;
  historyHandler: (commandInput: string) => void;
}

export type Commands = { [key in CommandType]?: Command };
