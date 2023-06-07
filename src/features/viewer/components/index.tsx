import { useSyncExternalStore } from "react";
import { Box, Container } from "@chakra-ui/react";

import { commands } from "~/core/store/commands";

export function Viewer() {
  const appState = useSyncExternalStore(
    (listener) => commands.subscribe(listener),
    () => commands.getViewStateSnapshot(),
    () => commands.getViewStateSnapshot()
  );

  return (
    <Container maxW="550" minW="300">
      <Box my={24}>
        {appState.map(({ viewType: ViewType, ...view }) => {
          return <ViewType key={`component-${view.id}`} {...view} />;
        })}
      </Box>
    </Container>
  );
}
