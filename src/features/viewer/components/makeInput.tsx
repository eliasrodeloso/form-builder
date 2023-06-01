import { Input } from "@chakra-ui/react";

export function makeInput([name, type = "text"]: string[] = []) {
  const Component = () => <Input type={type} name={name} />;

  return Component;
}
