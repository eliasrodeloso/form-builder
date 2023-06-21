import { BehaviorSubject, Subject } from "rxjs";

import { type HistoryState } from "~/core/services/types";

export class HistoryService {
  private history: BehaviorSubject<HistoryState>;
  private lastHistoryItemId: string | undefined;

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

  public updateLastHistoryItem = (newId: string) => {
    this.lastHistoryItemId = newId;
  };

  public clearLastHistoryItem = () => {
    this.lastHistoryItemId = undefined;
  };

  public get getLastHistoryItem() {
    return this.lastHistoryItemId;
  }
}

export let historyService: HistoryService;

export function initializeHistoryService(
  initialHistory: HistoryState = new Map()
) {
  historyService = new HistoryService(initialHistory);
}
