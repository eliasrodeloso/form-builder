import { Fragment, useSyncExternalStore } from "react";

import { commandStore } from "~/core/store/commands";
import { commandMapper } from "~/features/viewer/helpers/commandMapper";

export function Viewer() {
  const commandsStore = useSyncExternalStore(
    commandStore.subscribe,
    commandStore.getState,
    commandStore.getState
  );

  return (
    <Fragment>
      {commandsStore.map((command) => {
        const executor = commandMapper[command.type];

        if (!executor) {
          return null;
        }

        const Component = executor(command.args);

        return <Component key={`${command.type}-component-${command.id}`} />;
      })}
    </Fragment>
  );
}
