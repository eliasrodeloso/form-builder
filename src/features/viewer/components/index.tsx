import { useSyncExternalStore } from "react";
import { Box, Container } from "@chakra-ui/react";

import { applicationService } from "~/core/services/application";

export function Viewer() {
  const appState = useSyncExternalStore(
    (listener) => applicationService.subscribe(listener),
    () => applicationService.getViewStateSnapshot(),
    () => applicationService.getViewStateSnapshot()
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
