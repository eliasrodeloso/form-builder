export const commandTypes = [
  "none",
  "form.clear",
  "input.create",
  "label.create",
  "select.date.create",
  "button.create",
] as const;

// prettier-ignore
export type CommandType = typeof commandTypes[number];

export type Command = {
  id: number;
  input: string;
  type: CommandType;
  args?: string[];
};

export class CommandStore {
  private currentState: Command[] = [];
  private history: Command[] = [];
  private listeners = new Set<(state: Command[]) => void>();

  constructor(initialState: Command[]) {
    this.currentState = initialState;
    this.history = initialState;
  }

  private clearState(publish = true) {
    this.currentState = [];

    if (publish) {
      this.listeners.forEach((listener) => listener(this.currentState));
    }
  }

  public subscribe(listener: (state: Command[]) => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  public setState(fn: (state: Command[]) => Command[], publish = true) {
    this.currentState = fn(this.currentState);
    this.history = [...this.currentState];

    if (publish) {
      this.listeners.forEach((listener) => listener(this.currentState));
    }
  }

  public getState(): Command[] {
    return this.currentState;
  }

  public getHistory(): Command[] {
    return this.history;
  }

  public emitChanges() {
    this.listeners.forEach((listener) => listener(this.currentState));
  }

  /**
   * Controller to add a command to the store
   *
   * @param value any string that starts with a command type
   */
  public addCommand(value: string) {
    const type =
      commandTypes.find((type) => value.split(" ")[0] === type) ?? "none";

    if (type === "form.clear") {
      this.clearState();

      return;
    }

    const secondPart = value
      .substring(type?.length ?? value.length)
      .trim()
      .match(/("[^"]+"|\S+)/g)
      ?.map((el) => el.replace(/"/g, ""));

    const command = {
      type,
      value: secondPart,
    };

    this.setState((state) => [
      ...state,
      {
        id: state.length + 1,
        type: command.type,
        args: command.value,
        input: value,
      },
    ]);
  }
}
