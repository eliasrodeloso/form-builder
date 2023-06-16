import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";

import {
  CreateButtonCommand,
  CreateInputCommand,
  CreateLabelCommand,
} from "~/core/commands";
import { CreateFormCommand } from "~/core/commands/form";
import { toolCreator } from "~/core/tools";
import { env } from "~/env.mjs";

export async function agent(input: string) {
  const model = new OpenAI({
    openAIApiKey: env.OPENAI_API_KEY,
    temperature: 0,
  });

  const tools = [
    toolCreator(new CreateFormCommand()),
    toolCreator(new CreateInputCommand()),
    toolCreator(new CreateLabelCommand()),
    toolCreator(new CreateButtonCommand()),
  ];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
  });

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${JSON.stringify(result.output, null, 2)}`);

  return result.output as string;
}
