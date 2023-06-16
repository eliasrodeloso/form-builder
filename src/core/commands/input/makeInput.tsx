import { Input } from "@chakra-ui/react";

export function makeInput([name, type = "text"]: string[] = []) {
  const Component = () => <Input mb={4} type={type} name={name} />;

  return Component;
}
