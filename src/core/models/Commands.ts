import {
  commandTypes,
  viewTypes,
  type ApplicationState,
  type Command,
  type CommandView,
} from "~/core/models/types";

export class CommandStore {
  private applicationState: ApplicationState;
  private listeners = new Set<(state: (CommandView | null)[]) => void>();

  constructor(initialState: Command[]) {
    this.applicationState = {
      history: initialState,
      commandsView: [],
    };
  }

  private clearState() {
    this.applicationState.commandsView = [];
  }

  public subscribe(listener: (state: (CommandView | null)[]) => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  private generateView = (command: Command): CommandView | null => {
    if (command.type === "form.clear") {
      return null;
    }

    const viewType = viewTypes.find((type) => command.type.includes(type));

    if (!viewType) {
      return null;
    }

    const type = (command.args?.[1] ?? "text") as CommandView["type"];

    return {
      id: command.type,
      name: command.args?.[0] ?? "",
      viewType,
      type,
    };
  };

  public setState(fn: (state: Command[]) => Command[], publish = true) {
    this.applicationState.history = fn(this.applicationState.history);
    this.applicationState.commandsView = this.applicationState.history.map(
      this.generateView
    );

    if (publish) {
      this.listeners.forEach((listener) =>
        listener(this.applicationState.commandsView)
      );
    }
  }

  public getView(): (CommandView | null)[] {
    return this.applicationState.commandsView;
  }

  public getHistory(): Command[] {
    return this.applicationState.history;
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
