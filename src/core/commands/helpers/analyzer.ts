import { type CommandType } from "~/core/commands/types";

export function commandAnalyzer(input: string) {
  const type = input.split(" ")[0] as CommandType;
  const commandElement = type?.split(".")[0];
  const commandAction = type?.split(".")[1];

  if (!commandElement || !commandAction) {
    return {
      type: "none",
      args: [],
    };
  }

  const secondPart = input
    .substring(type.length ?? input.length)
    .trim()
    .match(/("[^"]+"|\S+)/g)
    ?.map((el) => el.replace(/"/g, ""));

  return {
    type,
    args: secondPart,
  };
}
