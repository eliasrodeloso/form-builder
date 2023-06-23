import { type CommandType } from "~/core/commands/types";

export enum ViewTypes {
  Input = "input",
  Label = "label",
  Select = "select",
  Button = "button",
  Form = "form",
}

export type ViewElement = {
  id: string;
  viewType: ViewTypes;
  component: React.FC;
};

export type ApplicationState = ViewElement[];

export type ExecutedCommandHistory = {
  type: CommandType;
  input: string;
};

export type HistoryItem = {
  id: string;
  userInput: string;
  executedCommands?: ExecutedCommandHistory[];
  agentResponse?: string;
};

export type HistoryState = Map<string, HistoryItem>;
