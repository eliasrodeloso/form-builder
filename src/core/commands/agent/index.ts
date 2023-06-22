import { v4 as uuid } from "uuid";
import { z } from "zod";

import { agentService } from "~/core/agent";
import { CommandType, type Command } from "~/core/commands/types";
import { historyService } from "~/core/services/history";

const agentInput = z
  .string()
  .nonempty("Agent input must be at least 1 character long")
  .transform((input) => {
    return input.replaceAll('"', "");
  });
export type AgentInputSchema = z.infer<typeof agentInput>;

export class AgentExecuteCommand implements Command<AgentInputSchema> {
  public type = CommandType.AgentExecute;
  public description =
    "Executes the agent with the given input. It receives a single parameter: <input>. <input> is the input to the agent. This parameter should be sent as plain text. Example: <input>";

  public create = async (input: string) => {
    const sanitized = agentInput.safeParse(input);

    if (!sanitized.success) {
      return sanitized.error.message;
    }

    await this.handler(input);

    return Promise.resolve("Agent executed successfully!");
  };

  public handler = async (input: AgentInputSchema) => {
    await agentService.execute(input);
  };

  private startHistory = (input: string) => {
    const history = historyService.getHistoryState();

    historyService.clearLastHistoryItem();

    const id = uuid();

    historyService.updateHistoryState(
      new Map(history).set(id, {
        id,
        userInput: `${this.type} "${input}"`,
      })
    );

    historyService.updateLastHistoryItem(id);
  };

  private endHistory = (output: string) => {
    const history = historyService.getHistoryState();

    const lastItem = history.get(historyService.getLastHistoryItem ?? "");

    if (!lastItem) {
      return;
    }

    const newHistory = new Map(history).set(lastItem.id, {
      ...lastItem,
      agentResponse: output,
    });

    historyService.updateHistoryState(newHistory);
  };
}
