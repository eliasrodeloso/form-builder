import { FormLabel } from "@chakra-ui/react";

export function makeLabel([label]: string[] = []) {
  const Label = () => <FormLabel mb={4}>{label}</FormLabel>;

  return Label;
}
