import { FormLabel } from "@chakra-ui/react";

export function makeLabel([label, inputName]: string[] = []) {
  const Label = () => (
    <FormLabel htmlFor={inputName} mb={4}>
      {label}
    </FormLabel>
  );

  return Label;
}
