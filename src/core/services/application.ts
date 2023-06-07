import { BehaviorSubject, EMPTY, Subject } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { commandCreators } from "~/core/commands";
import { commandAnalyzer } from "~/core/commands/helpers/analyzer";
import { type HistoryItem, type HistoryState } from "~/core/commands/types";
import { type ApplicationState } from "~/core/services/types";

export class ApplicationService {
  private applicationState: BehaviorSubject<ApplicationState>;
  private history: BehaviorSubject<HistoryState>;
  private commandInput: Subject<string>;

  constructor(initialHistory: HistoryItem[]) {
    this.applicationState = new BehaviorSubject<ApplicationState>([]);
    this.history = new BehaviorSubject(initialHistory);
    this.commandInput = new Subject<string>();

    this.commandInput
      .pipe(
        map((commandInput) => {
          const { type } = commandAnalyzer(commandInput);
          const command = commandCreators[type];
          return { command, commandInput };
        }),
        switchMap(({ command, commandInput }) => {
          if (!command) {
            return EMPTY;
          }

          const newState = command.handler(
            commandInput,
            this.applicationState.value
          );
          const newHistory = command.historyHandler(
            commandInput,
            this.history.value
          );

          this.applicationState.next(newState);
          this.history.next(newHistory);

          return EMPTY;
        })
      )
      .subscribe();
  }

  public addCommand(commandInput: string) {
    console.log("calling addCommand");
    this.commandInput.next(commandInput);
  }

  public subscribe(listener: () => void) {
    const subscription = this.applicationState
      .asObservable()
      .subscribe(listener);

    return () => {
      subscription.unsubscribe();
    };
  }

  public subscribeHistory(listener: () => void) {
    const subscription = this.history.asObservable().subscribe(listener);

    return () => {
      subscription.unsubscribe();
    };
  }

  public getHistorySnapshot() {
    return this.history.value;
  }

  public getViewStateSnapshot() {
    return this.applicationState.value;
  }
}

export let applicationService: ApplicationService;

export function initializeApplicationService(initialHistory: HistoryItem[]) {
  applicationService = new ApplicationService(initialHistory);
}
