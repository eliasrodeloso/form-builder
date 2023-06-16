export enum CommandType {
  CreateInput = "input.create",
  CreateLabel = "label.create",
  CreateSelect = "select.create",
  CreateButton = "button.create",
  ClearForm = "form.clear",
}
export interface Command {
  type: CommandType;
  description: string;
  create: (input: string) => string;
  handler: <Schema>(labelValue: Schema) => void;
}

export type Commands = { [key in CommandType]?: Command };
