import {
  initializeAgentExecutorWithOptions,
  type AgentExecutor,
} from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";
import { type DynamicTool } from "langchain/tools";
import { v4 as uuid } from "uuid";

import {
  CreateButtonCommand,
  CreateInputCommand,
  CreateLabelCommand,
} from "~/core/commands";
import { CreateFormCommand } from "~/core/commands/form";
import { historyService } from "~/core/services/history";
import { toolCreator } from "~/core/tools";
import { env } from "~/env.mjs";

export class AgentService {
  private agentExecutor: AgentExecutor;

  constructor(agentExecutor: AgentExecutor) {
    this.agentExecutor = agentExecutor;
  }

  async execute(input: string) {
    const history = historyService.getHistoryState();

    historyService.clearLastHistoryItem();

    const id = uuid();

    historyService.updateHistoryState(
      new Map(history).set(id, {
        id,
        userInput: `Executing "${input}"`,
      })
    );

    historyService.updateLastHistoryItem(id);

    const result = await this.agentExecutor.call({ input });

    return result.output as string;
  }
}

async function createAgentService(tools?: DynamicTool[]) {
  const defaultTools = [
    toolCreator(new CreateFormCommand()),
    toolCreator(new CreateLabelCommand()),
    toolCreator(new CreateInputCommand()),
    toolCreator(new CreateButtonCommand()),
    ...(tools ?? []),
  ];

  const model = new OpenAI({
    openAIApiKey: env.NEXT_PUBLIC_OPENAI_API_KEY,
    temperature: 0,
  });

  const executor = await initializeAgentExecutorWithOptions(
    defaultTools,
    model,
    {
      agentType: "zero-shot-react-description",
    }
  );

  const agentService = new AgentService(executor);

  return agentService;
}

export const agentService: AgentService = await createAgentService();
