import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { OpenAI } from "langchain/llms/openai";

import { buttonActions } from "~/core/commands/button";
import { formActions } from "~/core/commands/form";
import { env } from "~/env.mjs";

export async function agent(input: string) {
  console.log("inpiut in agent", input);
  const model = new OpenAI({
    openAIApiKey: env.OPENAI_API_KEY,
    temperature: 0,
  });

  const tools = [buttonActions.create.tool, formActions.create.tool];

  const executor = await initializeAgentExecutorWithOptions(tools, model, {
    agentType: "zero-shot-react-description",
  });

  console.log(`Executing with input "${input}"...`);

  const result = await executor.call({ input });

  console.log(`Got output ${JSON.stringify(result.output, null, 2)}`);

  return result.output as string;
}
