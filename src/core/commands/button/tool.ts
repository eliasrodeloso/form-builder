import { DynamicTool } from "langchain/tools";

export class ButtonTool extends DynamicTool {
  constructor() {
    super({
      name: "button",
      description: "Button",
      func: async (input, runManager) => {
        console.log("input", input);
        console.log("runManager", runManager);

        return "Button created successfully!";
      },
    });
  }
}
