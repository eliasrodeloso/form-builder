import { commandCreators } from "~/core/commands";
import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type HistoryItem } from "~/core/commands/types";
import { type ApplicationState } from "~/core/services/types";

export class ApplicationService {
  private applicationState: ApplicationState;
  private history: HistoryItem[];
  private historyListeners = new Set<() => void>();
  private listeners = new Set<() => void>();

  constructor(initialHistory: HistoryItem[]) {
    this.history = initialHistory;
    this.applicationState = [];
  }

  /**
   * Controller to add a command to the store
   *
   * @param value any string that starts with a command type
   */
  public addCommand(commandInput: string) {
    const { type } = commandAnalyzer(commandInput);

    const command = commandCreators[type];

    if (!command) {
      return;
    }

    this.applicationState = command.handler(
      commandInput,
      this.applicationState
    );
    this.history = command.historyHandler(commandInput, this.history);

    this.emitChanges();
  }

  private emitChanges() {
    this.listeners.forEach((listener) => listener());
    this.historyListeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);

    return () => this.listeners.delete(listener);
  }

  public subscribeHistory(listener: () => void) {
    this.historyListeners.add(listener);

    return () => this.historyListeners.delete(listener);
  }

  public getHistorySnapshot() {
    return this.history;
  }

  public getViewStateSnapshot() {
    return this.applicationState;
  }
}
