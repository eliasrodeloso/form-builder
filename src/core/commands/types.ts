import { ValidationError, type Schema } from "yup";

import { errorFormatter } from "~/core/helpers/errorFormatter";
import { sanitizeInputs } from "~/core/helpers/sanitizeInput";
import { historyService } from "~/core/services/history";

export enum CommandType {
  CreateInput = "input.create",
  CreateLabel = "label.create",
  CreateSelect = "select.create",
  CreateButton = "button.create",
  ClearForm = "form.clear",
  CreateForm = "form.create",
  AgentExecute = "agent.execute",
}
export interface Command<Args> {
  type: CommandType;
  description: string;
  create: (input: string) => Promise<string>;
  handler(value: Args): void;
  validateInput: (input: string) => Args;
  registerHistory: (input: Args) => void;
}

export abstract class CommandBase<Args> implements Command<Args> {
  public constructor(
    public readonly type: CommandType,
    public readonly description: string,
    public readonly schema: Args extends never ? never : Schema<Args>
  ) {
    this.type = type;
    this.description = description;
    this.schema = schema;
  }

  public abstract create(input: string): Promise<string>;
  public abstract handler(value: Args): void;

  public validateInput = (input: string): Args => {
    const sanitized = sanitizeInputs(input);
    const [name, type] = sanitized.split(",").map((param) => param.trim());

    try {
      const validationResult = this.schema.validateSync({
        name,
        type,
      });

      return validationResult;
    } catch (error) {
      if (error instanceof ValidationError) {
        const message = errorFormatter(error);

        throw new Error(message);
      }

      throw error;
    }
  };

  public registerHistory = (input: Args) => {
    const history = historyService.getHistoryState();

    const lastItem = history.get(historyService.getLastHistoryItem ?? "");

    if (!lastItem) {
      return;
    }

    const newHistory = new Map(history).set(lastItem.id, {
      ...lastItem,
      executedCommands: [
        ...(lastItem?.executedCommands || []),
        {
          input: input as string,
          type: this.type,
        },
      ],
    });

    historyService.updateHistoryState(newHistory);
  };
}
