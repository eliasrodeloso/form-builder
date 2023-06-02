import { Button } from "@chakra-ui/react";

export function makeButton([value]: string[] = []) {
  const Component = () => <Button mb={4}>{value}</Button>;

  return Component;
}
