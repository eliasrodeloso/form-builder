import { DynamicTool } from "langchain/tools";

import { type ToolCreator } from "~/core/tools/types";

export const toolCreator: ToolCreator = (command) => {
  const { type, description, create } = command;

  return new DynamicTool({
    name: type.split(".")[0] ?? "",
    description,
    func: (input) => {
      return Promise.resolve(create(input));
    },
  });
};
