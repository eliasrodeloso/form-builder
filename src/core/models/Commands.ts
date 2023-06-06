import { commandCreators } from "~/core/commands";
import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type Command } from "~/core/commands/types";
import { type ApplicationState, type ViewElement } from "~/core/models/types";

export class CommandModel {
  private applicationState: ApplicationState;
  private history: Command[];
  private listeners = new Set<(state: (ViewElement | null)[]) => void>();

  constructor(initialState: Command[]) {
    this.history = initialState;
    this.applicationState = {
      state: new Set<ViewElement>(),
    };
  }

  private clearState() {
    this.applicationState = {
      state: new Set<ViewElement>(),
    };
  }

  /**
   * Controller to add a command to the store
   *
   * @param value any string that starts with a command type
   */
  public addCommand(commandInput: string) {
    const { type, args } = commandAnalyzer(commandInput);

    const command = commandCreators[type];

    if (!command) {
      return;
    }

    const applicationState = command?.handler(
      commandInput,
      this.applicationState
    );

    this.applicationState = applicationState ?? this.applicationState;
  }

  // public subscribe(listener: (state: (ViewElement | null)[]) => void) {
  //   this.listeners.add(listener);

  //   return () => this.listeners.delete(listener);
  // }
}
