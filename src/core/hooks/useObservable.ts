import { useSyncExternalStore } from "react";
import { type Observable } from "rxjs";

export function useObservable<T>(observable: Observable<T>) {
  const getSnapshot = () => {
    let snapshot: T | undefined;

    observable
      .subscribe((value) => {
        snapshot = value;
      })
      .unsubscribe();

    return snapshot;
  };

  return useSyncExternalStore<T | undefined>(
    (listener) => {
      const subscription = observable.subscribe(listener);

      return () => {
        subscription.unsubscribe();
      };
    },
    getSnapshot,
    getSnapshot
  );
}
