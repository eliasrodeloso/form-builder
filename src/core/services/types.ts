import { type CommandType } from "~/core/commands/types";

export enum ViewTypes {
  Input = "input",
  Label = "label",
  Select = "select",
  Button = "button",
  Form = "form",
}

export type ViewElement = {
  id: number;
  viewType: ViewTypes;
  component: React.FC;
};

export type ApplicationState = ViewElement[];

export type HistoryItem = {
  type: CommandType;
  input: string;
};

export type HistoryState = HistoryItem[];
