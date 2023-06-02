import { FormLabel } from "@chakra-ui/react";

export function makeLabel([label]: string[] = []) {
  const Component = () => <FormLabel mb={4}>{label}</FormLabel>;

  return Component;
}
