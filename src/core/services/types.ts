import { type CommandType } from "~/core/commands/types";

export enum ViewTypes {
  "input" = "input",
  "label" = "label",
  "select" = "select",
  "button" = "button",
}

export type ViewElement = {
  id: number;
  viewType: ViewTypes;
  component: React.ReactNode;
};

export type ApplicationState = ViewElement[];

export type HistoryItem = {
  type: CommandType;
  input: string;
};

export type HistoryState = HistoryItem[];
