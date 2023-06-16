import { Button } from "@chakra-ui/react";

export function makeButton([value]: string[] = []) {
  const Component = () => (
    <Button my={4} width="100%" backgroundColor="black" color="white">
      {value}
    </Button>
  );

  return Component;
}
