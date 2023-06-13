import { type Tool } from "langchain/tools";

import { type Command } from "~/core/commands/types";

export type ToolCreator = (command: Command) => Tool;
