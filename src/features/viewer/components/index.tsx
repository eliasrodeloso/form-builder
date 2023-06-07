import { Box, Container } from "@chakra-ui/react";

import { useObservable } from "~/core/hooks/useObservable";
import { applicationService } from "~/core/services/application";

export function Viewer() {
  const appState = useObservable(applicationService.onApplicationState());

  return (
    <Container maxW="550" minW="300">
      <Box my={24}>
        {appState?.map(({ viewType: ViewType, ...view }) => {
          return <ViewType key={`component-${view.id}`} {...view} />;
        })}
      </Box>
    </Container>
  );
}
