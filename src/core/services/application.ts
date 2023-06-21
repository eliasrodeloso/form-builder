import { BehaviorSubject, type Observable } from "rxjs";

import { historyService } from "~/core/services/history";
import {
  HistoryItem,
  type ApplicationState,
  type ExecutedCommandHistory,
} from "~/core/services/types";

export class ApplicationService {
  private applicationState: BehaviorSubject<ApplicationState>;

  constructor(initialState: ApplicationState) {
    this.applicationState = new BehaviorSubject<ApplicationState>(initialState);
  }

  public onApplicationState = (): Observable<ApplicationState> => {
    return this.applicationState.asObservable();
  };

  public updateApplicationState = (
    newState: ApplicationState,
    historyItem: ExecutedCommandHistory
  ) => {
    this.applicationState.next(newState);

    const history = historyService.getHistoryState();

    const lastItem = history.get(historyService.getLastHistoryItem ?? "");

    if (!lastItem) {
      return;
    }

    const newHistory = new Map(history).set(lastItem.id, {
      ...lastItem,
      executedCommands: [...(lastItem?.executedCommands || []), historyItem],
    });

    historyService.updateHistoryState(newHistory);
  };

  public getApplicationState = (): ApplicationState => {
    return this.applicationState.value;
  };
}

export let applicationService: ApplicationService;

export function initializeApplicationService(initialHistory: ApplicationState) {
  applicationService = new ApplicationService(initialHistory);
}
