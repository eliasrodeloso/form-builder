import { useSyncExternalStore } from "react";
import { Box, Container } from "@chakra-ui/react";

import { commandsStore } from "~/core/store/commands";
import { commandMapper } from "~/features/viewer/helpers/commandMapper";

export function Viewer() {
  const commandsState = useSyncExternalStore(
    (state) => commandsStore.subscribe(state),
    () => commandsStore.getState(),
    () => commandsStore.getState()
  );

  return (
    <Container maxW="550" minW="300">
      <Box my={24}>
        {commandsState.map((command) => {
          const executor = commandMapper[command.type];

          if (!executor) {
            return null;
          }

          const Component = executor(command.args);

          return <Component key={`${command.type}-component-${command.id}`} />;
        })}
      </Box>
    </Container>
  );
}
