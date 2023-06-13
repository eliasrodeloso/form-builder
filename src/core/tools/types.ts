import { type DynamicTool } from "langchain/tools";

import { type RefactoredCommand } from "~/core/commands/types";

export type ToolCreator = (command: RefactoredCommand) => DynamicTool;
