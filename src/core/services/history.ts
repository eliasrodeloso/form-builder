import { BehaviorSubject } from "rxjs";

import { type HistoryState } from "~/core/services/types";

export class HistoryService {
  private history: BehaviorSubject<HistoryState>;

  constructor(initialHistory: HistoryState) {
    this.history = new BehaviorSubject(initialHistory);
  }

  public onHistoryState = () => {
    return this.history.asObservable();
  };

  public updateHistoryState = (newState: HistoryState) => {
    this.history.next(newState);
  };

  public getHistoryState = () => {
    return this.history.value;
  };
}

export let historyService: HistoryService;

export function initializeHistoryService(initialHistory: HistoryState = []) {
  historyService = new HistoryService(initialHistory);
}
