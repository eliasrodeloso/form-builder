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

export type Command = {
  type: CommandType;
  handler: (input: string, appState: ApplicationState) => ApplicationState;
  historyHandler: (input: string, history: HistoryItem[]) => HistoryItem[];
  tool: DynamicTool;
};

// just for poc
export type RefactoredCommand = {
  type: CommandType;
  handler: (input: string, appState: ApplicationState) => ApplicationState;
  historyHandler: (input: string, history: HistoryItem[]) => HistoryItem[];
  description: string;
  create: boolean;
};

export type Commands = { [key in CommandType]?: Command };
