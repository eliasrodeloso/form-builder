import { DynamicTool } from "langchain/tools";

import { type ToolCreator } from "~/core/tools/types";

export const toolCreator: ToolCreator = (command) => {
  const tool = new DynamicTool({
    name: command.type,
    description: command.description,
    func: command.create,
  });

  return tool;
};
