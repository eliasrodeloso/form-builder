export enum CommandType {
  CreateInput = "input.create",
  CreateLabel = "label.create",
  CreateSelect = "select.create",
  CreateButton = "button.create",
  ClearForm = "form.clear",
  CreateForm = "form.create",
  AgentExecute = "agent.execute",
}
export interface Command<ValidationSchema> {
  type: CommandType;
  description: string;
  create: (input: string) => Promise<string>;
  handler(value: ValidationSchema): void;
}
