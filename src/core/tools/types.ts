import { type DynamicTool } from "langchain/tools";

import { type Command } from "~/core/commands/types";

export type ToolCreator = <Schema>(command: Command<Schema>) => DynamicTool;
