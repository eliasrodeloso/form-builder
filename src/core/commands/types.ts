export enum CommandType {
  CreateInput = "input.create",
  CreateLabel = "label.create",
  CreateSelect = "select.create",
  CreateButton = "button.create",
  ClearForm = "form.clear",
  CreateForm = "form.create",
}
export interface Command<ValidationSchema> {
  type: CommandType;
  description: string;
  create: (input: string) => string;
  handler(value: ValidationSchema): void;
}
