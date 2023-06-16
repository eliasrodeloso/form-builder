import { BehaviorSubject, type Observable } from "rxjs";

import { historyService } from "~/core/services/history";
import { type ApplicationState, type HistoryItem } from "~/core/services/types";

export class ApplicationService {
  private applicationState: BehaviorSubject<ApplicationState>;

  constructor(initialState: ApplicationState) {
    this.applicationState = new BehaviorSubject<ApplicationState>(initialState);
  }

  public onApplicationState(): Observable<ApplicationState> {
    return this.applicationState.asObservable();
  }

  public updateApplicationState(
    newState: ApplicationState,
    historyItem: HistoryItem
  ) {
    this.applicationState.next(newState);

    const history = historyService.getHistoryState();

    historyService.updateHistoryState([...history, historyItem]);
  }

  public getApplicationState(): ApplicationState {
    return this.applicationState.value;
  }
}

export let applicationService: ApplicationService;

export function initializeApplicationService(initialHistory: ApplicationState) {
  applicationService = new ApplicationService(initialHistory);
}
