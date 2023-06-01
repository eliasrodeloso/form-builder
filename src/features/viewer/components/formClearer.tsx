import { Box } from "@chakra-ui/react";

export function formClearer(_inputArgs?: string[]): React.FC {
  const Component = (props: React.PropsWithChildren<unknown>) => (
    <Box>{props.children}</Box>
  );

  return Component;
}
