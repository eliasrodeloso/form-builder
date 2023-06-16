import { FormLabel } from "@chakra-ui/react";

export function makeLabel([label]: string[] = []) {
  return <FormLabel mb={4}>{label}</FormLabel>;
}
