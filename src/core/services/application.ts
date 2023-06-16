import { BehaviorSubject, type Observable } from "rxjs";

import { type HistoryItem, type HistoryState } from "~/core/commands/types";
import { type ApplicationState } from "~/core/services/types";

export class ApplicationService {
  private applicationState: BehaviorSubject<ApplicationState>;
  private history: BehaviorSubject<HistoryState>;

  constructor(initialHistory: HistoryItem[]) {
    this.applicationState = new BehaviorSubject<ApplicationState>([]);
    this.history = new BehaviorSubject(initialHistory);
  }

  public onApplicationState(): Observable<ApplicationState> {
    return this.applicationState.asObservable();
  }

  public updateApplicationState(newState: ApplicationState) {
    this.applicationState.next(newState);
  }

  public getApplicationState(): ApplicationState {
    return this.applicationState.value;
  }

  public updateHistoryState(newState: HistoryState) {
    this.history.next(newState);
  }

  public getHistoryState(): HistoryState {
    return this.history.value;
  }

  public onHistoryState(): Observable<HistoryState> {
    return this.history.asObservable();
  }
}

export let applicationService: ApplicationService;

export function initializeApplicationService(initialHistory: HistoryItem[]) {
  applicationService = new ApplicationService(initialHistory);
}
